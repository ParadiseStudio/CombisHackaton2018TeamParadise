import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
//Dependencies
import { observer } from 'mobx-react'
import locator from '../../../state/Store'

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    }
})

@observer
class NotificationsProvider extends React.Component {

    _handleClose = () => {
        locator.notificationStore.clearNotification()
    }

    render() {
        const { notificationInstance } = locator.notificationStore
        const { classes } = this.props
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={!!notificationInstance}
                autoHideDuration={2000}
                onClose={this._handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={< span id="message-id" > {notificationInstance} </span >}
                action={
                    [
                        <Button
                            key="undo"
                            color="secondary"
                            size="small"
                            onClick={this._handleClose}>
                            UNDO
                         </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this._handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
            />
        )
    }
}

export default withStyles(styles)(NotificationsProvider)