import React from 'React'
import { observer } from 'mobx-react'
//Local dependencies
import locator from './state/Store'
import Auth from './UI/Auth'
import Home from './UI/Home'
import NotificationsProvider from './UI/NotificationsProvider'


@observer
export default class Router extends React.Component {

    render() {
        return (
            <React.Fragment>
                {
                    locator.authStore.isLoggedIn
                        ? <Home />
                        : <Auth />
                }
                {/* <NotificationsProvider /> */}
            </React.Fragment>
        )
    }
}