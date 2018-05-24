// @flow
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

class NotFound extends Component<any> {
    render() {
        const { classes } = this.props
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            404 - Not found
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Looks like this web page doesn't exist!
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}

export default withStyles(styles)(NotFound)