// @flow
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo'
import { Font } from 'expo'
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from 'native-base'

import { observer } from 'mobx-react'
//Local dependencies
import locator from '../state/Store'
import makeRequest from '../services/RESTService'
import { login, register } from '../services/Requests/AuthRequests'

type State = {
  email: ?string,
  password: ?string,
}

const fields = {
  email: 'email',
  password: 'password'
}



@observer
export default class Auth extends React.Component<any, State> {

  handleChange = (e: any) => {
    this.setState({ [e.target.id]: e.target.value }, () => console.log(this.state))
  }

  onSubmit = () => {
    const { email, password } = this.state
    if (!email || !password) return
    const config = login({
        email,
        password
    })
    makeRequest(config)
      .then(
        response => {
          console.log(response)
          locator.authStore.setUser(response.data.user)
        }
      )
      .catch(
        err => { console.log(err.message)
          locator.notificationStore.setNotification("Oops, something went wrong")
        })
  } 

  register = (data: { username: string, email: string, password: string }) => {
    const mockUser = {
      username: 'blaz',
      email: 'jurisic.blaz@gmail.com',
      password: 'jasamblaz'
    }
    const config = register(mockUser)
    makeRequest(config)
      .then(
        response => console.log(response.data)
      )
  }

  onUsernameChange = (text: string) => this.setState({email: text})
  onPasswordChange = (text: string) => this.setState({password: text})

  render() {
    return (
      <LinearGradient
        colors={colors.backgroundColors}
        style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Droplet </Text>
        </View>
        <View style={styles.searchContainer}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={this.onUsernameChange} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={this.onPasswordChange} />
            </Item>
            <View style={{ marginTop: 20 }}>
              <Button onPress={this.onSubmit} block primary><Text> Login </Text></Button>
              <Button block style={{ backgroundColor: 'transparent' }}><Text style={{ color: 'blue', textDecorationLine: 'underline' }}> Don't have an account? Register</Text></Button>

            </View>
          </Form>
        </View>
        <View style={styles.loginContainer}>
          <Text style={{ color: 'white' }}>Or connect with: </Text>
          <View style={{ width: 200, paddingTop: 10 }}>
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              onPress={this.loginWithFacebook}>
              Login with Facebook
          </Icon.Button>
          </View>
          <View style={{ width: 200, paddingTop: 5 }}>
            <Icon.Button
              name="google"
              backgroundColor="#EA4335"
              onPress={this.loginWithFacebook}>
              Login with Google
          </Icon.Button>
          </View>
        </View>
      </LinearGradient >
    )
  }
}
const customFonts = {
  coolFont: 'cool-font'
}
const flexWords = {
  center: 'center'
}
const colors = {
  basic: {
    white: 'rgb(255, 255, 255)'
  },
  backgroundColors: [
    '#FF846B',
    '#F76671'
  ],
  searchButton: {
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgb(255,255,255)'
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(200,200,200)',
    flex: 1,
    alignItems: flexWords.center,
    justifyContent: flexWords.center,
  },
  titleContainer: {
    flex: 2,
    alignItems: flexWords.center,
    justifyContent: flexWords.center,
  },
  searchContainer: {
    flex: 2,
    justifyContent: flexWords.center,
    width: '80%'
  },
  loginContainer: {
    flex: 3,
    alignItems: flexWords.center,
    justifyContent: flexWords.center,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: colors.searchButton.borderColor,
    alignItems: flexWords.center,
    justifyContent: flexWords.center,
    width: 150,
    height: 150,
    backgroundColor: colors.searchButton.backgroundColor,
    borderRadius: 150,
    margin: 25
  },
  title: {
    fontFamily: customFonts.coolFont,
    fontSize: 56,
    color: colors.basic.white
  }
})



{/* <TouchableOpacity style={styles.searchButton}>
            <Icon
              name={"search"}
              size={40}
              color="#01a699" />
          </TouchableOpacity> */}