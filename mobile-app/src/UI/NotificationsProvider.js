// import React from 'react'
// import { Toast } from 'native-base';
// //Dependencies
// import { observer } from 'mobx-react'
// import locator from '../state/Store'

// @observer
// class NotificationsProvider extends React.Component {
//     _handleClose = () => {
//         locator.notificationStore.clearNotification()
//     }

//     render() {
//         const { notificationInstance } = locator.notificationStore
//         console.log('hello ' + notificationInstance)
//         const { classes } = this.props
//         if (notificationInstance) Toast.show({
//             text: "Wrong password!",
//             buttonText: "Okay",
//             duration: 3000
//         })
//     }
// }

// export default NotificationsProvider