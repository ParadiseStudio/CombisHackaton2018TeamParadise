// @flow

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//Components
import Home from './UI/components/Home/Home'
import NotFound from './UI/components/NotFound/NotFound'
import Auth from './UI/components/Auth/Auth'
import NotificationsProvider from './UI/components/NotificationProvider/NotificationsProvider'
//Dependencies
import { observer } from 'mobx-react'
import locator from './state/Store'


@observer
class Router extends Component<any> {
    render() {
        const { isLoggedIn } = locator.authStore
        return (
            <React.Fragment>
                <BrowserRouter>
                    {
                        isLoggedIn
                            ? <Switch>
                                <Route
                                    exact path="/"
                                    component={Home} />
                                <Route component={NotFound} />
                            </Switch>
                            : <Route component={Auth} />
                    }
                </BrowserRouter>
                <NotificationsProvider />
            </React.Fragment>
        )
    }
}

export default Router