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
import { login, register, getDonators } from '../services/Requests/AuthRequests'
import { get } from 'http';

type State = {
    email: ?string,
    password: ?string,
}

const fields = {
    email: 'email',
    password: 'password'
}

@observer
export default class Home extends React.Component<any, State> {

    getDonators = () => {
        const config = getDonators()
        makeRequest(config)
            .then(response => console.log(response))
    }

    render() {
        this.getDonators()
        return (
            <LinearGradient
                colors={colors.backgroundColors}
                style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}> Droplet </Text>
                </View>
            </LinearGradient>
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
        'rgb(253,154,107)',
        'rgb(231,116,101)'
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