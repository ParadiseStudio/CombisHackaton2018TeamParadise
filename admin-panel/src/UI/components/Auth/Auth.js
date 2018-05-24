// @flow

import React, { Component } from 'react'
import { observer } from 'mobx-react'
//MaterialUI
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/es/Button/Button"
//Local dependencies
import locator from '../../../state/Store'
import makeRequest from '../../../services/RESTService'
import { login, register } from '../../../services/Requests/AuthRequests'

type State = {
    email: ?string,
    password: ?string,
}

const fields = {
    email: 'email',
    password: 'password'
}

@observer
class Auth extends React.Component<any, State> {
    state = {
        email: '',
        password: ''
    }

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
                response => locator.authStore.setUser(response.data.user)
            )
            .catch(
                _ => locator.notificationStore.setNotification("Oops, something went wrong")
            )
    }

    register = (data: { username: string, email: string, password: string }) => {
        // const mockUser = {
        //     username: 'blaz',
        //     email: 'jurisic.blaz@gmail.com',
        //     password: 'jasamblaz'
        // }
        const config = register(data)
        makeRequest(config)
            .then(
                response => console.log(response.data)
            )
    }

    render() {
        const { classes } = this.props
        const { isLoggedIn } = locator.authStore
        return (
            <form className={classes.container} autoComplete="off">
                <TextField
                    required
                    id={fields.email}
                    label={fields.email}
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange}
                    margin="normal"
                    disabled={isLoggedIn}
                />
                <TextField
                    value={this.state.password}
                    onChange={this.handleChange}
                    id={fields.password}
                    label={fields.password}
                    className={classes.textFielgud}
                    type={fields.password}
                    autoComplete="current-password"
                    margin="normal"
                    disabled={isLoggedIn}
                />
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={this.onSubmit}
                    disabled={isLoggedIn}
                >
                    Default
                    </Button>
                {
                    isLoggedIn
                    && console.log("heyyyy")
                }
            </form>
        )
    }
}

const styles = {
    button: {
        marginTop: '30px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default withStyles(styles)(Auth)