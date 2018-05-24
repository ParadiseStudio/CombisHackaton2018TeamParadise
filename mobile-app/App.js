import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo'
import { Font } from 'expo'
//Dependencies
import Router from './src/Router'

export default class App extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      [customFonts.coolFont]: require('./assets/fonts/cool-font.otf')
    })
    this.setState({ fontLoaded: true });
  }

  state = {
    fontLoaded: false
  }

  render() {
    return this.state && this.state.fontLoaded && <Router/>
  }
}

const customFonts = {
  coolFont: 'cool-font'
}