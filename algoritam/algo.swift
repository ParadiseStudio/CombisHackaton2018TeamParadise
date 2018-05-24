//
//  main.swift
//  HackatonAlgo2
//
//  Created by Marin Benčević on 23/05/2018.
//  Copyright © 2018 marinbenc. All rights reserved.
//

import Foundation

let content = try String(contentsOf: URL(fileURLWithPath: "/Users/marinbenc/Downloads/donors_csv.txt"), encoding: .utf8)

//func evaluate(ids: [String], elapsedDays: Int, onComplete: @escaping ([String])-> Void) {
//  let sema = DispatchSemaphore(value: 0)
//
//  let session = URLSession.shared
//  var request = URLRequest(url: URL(string: "http://hackaton.westeurope.cloudapp.azure.com/api/evaluate")!)
//  request.httpMethod = "POST"
//  request.setValue("application/json", forHTTPHeaderField: "Content-Type")
//  request.httpBody = try! JSONSerialization.data(withJSONObject: [
//    "input_ids": ids.map { Int($0)! },
//    "days_past": elapsedDays
//    ],
//    options: .prettyPrinted)
//
//  session.dataTask(with: request) { (data, _, _) in
//    let response = String(data: data!, encoding: .utf8)!
//    let responseIDs = response.split(separator: ",").map(String.init)
//    onComplete(responseIDs)
//    sema.signal()
//    }.resume()
//
//  sema.wait()
//}

struct Donor: Codable {
  let id: String
  let frequency: Float
  var lastDonation: Int
  let bloodGroup: String
  let sex: String
  let distance: Int
}

class Parser {
  static func parse(data: String)-> [Donor] {
    var results: [[String]] = []
    let rows = data.split(separator: "\r\n").map(String.init)
    for row in rows {
      let columns = row.split(separator: ",").map(String.init)
      results.append(columns)
    }
    
    results.remove(at: 0)
    
    return results.map { result in
      return Donor(id: result[0], frequency: Float(result[1])!, lastDonation: Int(result[2])!, bloodGroup: result[3], sex: result[4], distance: Int(result[5])!)
    }
  }
  
  static func serializeIDs(donors: [Donor])-> String {
    return donors.map { $0.id }.joined(separator: ",")
  }
}

func -(lhs: [Int], rhs: [Int])-> [Int] {
  return lhs.enumerated().map { (index, i) in i - rhs[index] }
}

// State

var donors = Parser.parse(data: content)
var elapsedDays = 0


// ALGO

let minSupplies = [38,115,46,100,38,23,8,16]
let maxSupplies = [78,240,96,210,82,50,18,36]

let optimalSupplies = [58,177,71,155,60,36,13,26]
let p = [35,105,42,91,35,21,7,14]
let z0 = [50,130,60,150,50,30,8,20]

func bloodNeeded(start: [Int])-> [Int] {
  let endOfWeek = start - p
  let deltas = optimalSupplies - endOfWeek
  return deltas
}

func getDonors(bloodType: String, bloodNeeded: Float)-> [Donor] {
  
  guard bloodNeeded > 0 else {
    return []
  }
  
  let acceptable = donors
    .filter {
      $0.bloodGroup == bloodType
    }
    // Enough time has passed since last donation
    .filter {
      if $0.sex == "M" {
        return $0.lastDonation >= 120
      } else {
        return $0.lastDonation >= 90
      }
  }
  //    .sorted { $0.distance < $1.distance }
  
  let probabilities: [Float] = acceptable.map { donor in
    let w1: Float = 0.6
    let w2: Float = 0.4
    
    if donor.sex == "M" {
      let p1 = donor.frequency / 4.5
      let p2 = Float(donor.distance) / 79.0
      return p1 * w1 + p2 * w2
    } else {
      let p1 = donor.frequency / 3.5
      let p2 = Float(donor.distance) / 79.0
      return p1 * w1 + p2 * w2
    }
    }.sorted(by: >)
  
  var currentSum: Float = 0
  var called: [Donor] = []
  
  for (index, donor) in acceptable.enumerated() {
    let probs = probabilities[index]
    if probs > 0 {
      currentSum += probs
      called.append(donor)
    }
    if (currentSum > bloodNeeded + bloodNeeded * 0.5) {
      break
    }
  }
  
  return called
}

func correct(targets: [String: Int], output: [String: Int])-> [String: Int] {
  var output = output
  
  let groups = ["AB+", "AB-", "B+", "B-", "A+", "A-", "0+"]
  
  let acceptableDonors: [String: [String]]  = [
    "0-": [],
    "A-": ["0-"],
    "B-": ["0-"],
    "AB-": ["A-", "B-", "0-"],
    "0+": ["0-"],
    "A+": ["A-", "0+", "0-"],
    "B+": ["B-", "0+", "0-"],
    "AB+": ["AB-", "B+", "B-", "A+", "A-", "0+", "0-"]
  ]
  
  for group in groups where output[group]! < targets[group]! {
    let others = acceptableDonors[group]!
    let toTarget = targets[group]! - output[group]!
    for other in others where output[other]! > targets[other]! {
      let otherToTarget = output[other]! - targets[other]!
      let toGive = min(toTarget, otherToTarget)
      output[other]! -= toGive
      output[group]! += toGive
      if output[group]! <= targets[group]! {
        break
      }
    }
  }
  
  return output
}

let bloodTypes = ["0-", "0+", "A-", "A+", "B-", "B+", "AB-", "AB+"]

func getCalls(needed: [Int])-> [Donor] {
  let allCalled: [Donor] = bloodTypes.enumerated().map { (arg)-> [Donor] in
    let (index, bloodType) = arg
    return getDonors(bloodType: bloodType, bloodNeeded: Float(needed[index]))
    }.flatMap { $0 }
  
  return allCalled
}

func getNextStart(evaluated: [String], allCalled: [Donor], needed: [Int])-> [Int] {
  let saidYes = allCalled.filter { evaluated.contains($0.id) }
  
  let byType: [String: [Donor]] = Dictionary(grouping: saidYes, by: { donor -> String in
    return donor.bloodGroup
  })
  
  var targetDict: [String: Int] = [:]
  zip(bloodTypes, needed).forEach {
    targetDict[$0.0] = $0.1
  }
  
  var outputDict: [String: Int] = byType.mapValues { $0.count }
  if elapsedDays > 0 {
    outputDict = correct(targets: targetDict, output: outputDict)
  }
  
  return bloodTypes.map { outputDict[$0] ?? 0 }
}


func saveDonors() {
  let encoder = JSONEncoder()
  let data = try! encoder.encode(donors)
  let url = URL(fileURLWithPath: "/Users/marinbenc/Downloads/dkfo419fbn495.txt")
  try! data.write(to: url)
}

func getDonors() {
  let decoder = JSONDecoder()
  let data = try! Data(contentsOf: URL.init(fileURLWithPath: "/Users/marinbenc/Downloads/dkfo419fbn495.txt"))
  donors = try! decoder.decode([Donor].self, from: data)
}


let arguments = CommandLine.arguments

let startContent = arguments[1]
var start = startContent.split(separator: ",").map { Int($0)! }
let timeElapsed = Int(arguments[2])!

if arguments.count > 3 {
  let evaluatedFile = arguments[3]
  let evaluatedContent = try String(contentsOf: URL(fileURLWithPath: evaluatedFile), encoding: .utf8)
  let evaluated = evaluatedContent.split(separator: ",").map(String.init)
  
  for i in 0..<donors.count {
    if evaluated.contains(donors[i].id) {
      donors[i].lastDonation = 0
    } else {
      donors[i].lastDonation += timeElapsed
    }
  }
  saveDonors()
} else {
  if timeElapsed > 0 {
    getDonors()
    saveDonors()
    
    var startDict: [String: Int] = [:]
    zip(bloodTypes, start).forEach {
      startDict[$0] = $1
    }
    
    if elapsedDays > 0 {
      let needed = bloodNeeded(start: start)
      var targetDict: [String: Int] = [:]
      zip(bloodTypes, needed).forEach {
        targetDict[$0.0] = $0.1
      }
      let corrected = correct(targets: targetDict, output: startDict)
      start = bloodTypes.map { corrected[$0]! }
    }
    let needed = bloodNeeded(start: start)
    let called = getCalls(needed: needed)
    let csv = called.map { $0.id }.joined(separator: ",")
    let path = URL(fileURLWithPath: "/Users/marinbenc/Downloads/sendToEval.txt")
    try! csv.write(to: path, atomically: true, encoding: .utf8)
  }
}






//func run(start: [Int], elapsedDays: Int)-> (ids: String, nextStart: [Int]) {
//  let bloodTypes = ["0-", "0+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
//
//  let needed = bloodNeeded(start: start)
//  let allCalled: [Donor] = bloodTypes.enumerated().map { (arg)-> [Donor] in
//    let (index, bloodType) = arg
//    return getDonors(bloodType: bloodType, bloodNeeded: Float(needed[index]))
//  }.flatMap { $0 }
//
//  evaluate(ids: allCalled.map { $0.id }, elapsedDays: elapsedDays) { output in
//    let saidYes = allCalled.filter { output.contains($0.id) }
//
//    let byType: [String: [Donor]] = Dictionary(grouping: saidYes, by: { donor -> String in
//      return donor.bloodGroup
//    })
//
//    var targetDict: [String: Int] = [:]
//    zip(bloodTypes, needed).forEach {
//      targetDict[$0.0] = $0.1
//    }
//
//    var outputDict: [String: Int] = byType.mapValues { $0.count }
//    if elapsedDays > 0 {
//      outputDict = correct(targets: targetDict, output: outputDict)
//    }
//
//
//
////    var deltasDict: [String: Float] = [:]
////
////    var deltas: [Int] = []
////    for (key, value) in byType {
////      //  print(value.count)
////      //  print(targetDict[key]!)
////      deltas.append(abs(value.count - targetDict[key]!))
////      let target = targetDict[key]!
////      let current = value.count
////      deltasDict[key] = Float((target - current)) / Float(target)
////    }
////
//////    if (allCalled.isEmpty) {
//////      print("Empty")
//////    } else {
////      print("Before correction:")
////      print(deltasDict)
////
////      print("After correction:")
////      let corrected = correct(targets: targetDict, output: outputDict)
////      var correctedDeltasDict: [String: Float] = [:]
////      for (key, value) in corrected {
////        let target = targetDict[key]!
////        let current = value
////        correctedDeltasDict[key] = Float((target - current)) / Float(target)
////      }
////      print(correctedDeltasDict)
//////    }
////
//    // Reset donors who have donated
//    let yesIDs = saidYes.map { $0.id }
//    for i in 0..<donors.count {
//      if yesIDs.contains(donors[i].id) {
//        donors[i].lastDonation = 0
//      } else {
//        donors[i].lastDonation += 7
//      }
//    }
//  }
//}
