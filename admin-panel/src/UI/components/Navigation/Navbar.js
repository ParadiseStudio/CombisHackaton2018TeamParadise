// @flow

import React, {Component} from 'react'
import {computed, observable} from 'mobx'
import {observer} from 'mobx-react'
import {withStyles} from '@material-ui/core/styles'
import Button from "@material-ui/core/es/Button/Button"
import locator from '../../../state/Store'
import makeRequest from '../../../services/RESTService'
import IconButton from "@material-ui/core/es/IconButton/IconButton"
import Typography from "@material-ui/core/es/Typography/Typography"
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar"
import AppBar from "@material-ui/core/es/AppBar/AppBar"

class Navbar extends React.Component<any> {

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appbar} classes={{root: classes.appbarRoot}}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Title
                        </Typography>
                        <Button
                            className={'button'}
                            classes={{root: classes.buttonRoot}}
                            color="inherit"
                        >
                            Login
                        </Button>
                        <Button
                            className={'button'}
                            classes={{root: classes.buttonRoot}}
                            color="inherit"
                        >
                            Login
                        </Button>
                        <Button
                            className={'button'}
                            classes={{root: classes.buttonRoot}}
                            color="inherit"
                        >
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const styles = {
    appbar: {},
    root: {
    },
    buttonRoot: {
        height: '40px',
        marginLeft: '20px'
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
}

export default withStyles(styles)(Navbar)
