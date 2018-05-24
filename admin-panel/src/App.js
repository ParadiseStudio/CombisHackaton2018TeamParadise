// @flow
import React, { Component } from 'react'
//fonts
import 'typeface-roboto'

//Dependencies
import Router from './Router'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './UI/Theme'

class App extends Component<any> {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router/>
            </MuiThemeProvider>
        )
    }
}

export default App
