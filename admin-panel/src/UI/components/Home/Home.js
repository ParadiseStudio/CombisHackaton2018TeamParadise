// @flow
import React, {Component} from 'react'
import Typography from "@material-ui/core/es/Typography/Typography"
import {withStyles} from '@material-ui/core/styles'
import Navbar from '../Navigation/Navbar'

class Home extends Component<any> {
    render() {
        const {classes} = this.props
        return (
            <div> 

                <Navbar />
            <div className={classes.landingContent}>
                <div className={classes.landingSplash}>
                    <div className={`${classes.content} ${classes.splashContent}`} id={'splash-content'}>
                        <Typography variant="headline" color="inherit" className={classes.flex}>
                            My cool-ass app!
                        </Typography>
                        <Typography variant="subheading" color="inherit" className={classes.flex}>
                            The coolest app there ever was.
                        </Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography variant="headline" color="inherit" className={classes.flex}>
                            My cool-ass app!
                        </Typography>
                        <Typography variant="subheading" color="inherit" className={classes.flex}>
                            The coolest app there ever was.
                        </Typography>
                    </div>
                    <div className={classes.content}>
                        <Typography variant="headline" color="inherit" className={classes.flex}>
                            My cool-ass app!
                        </Typography>
                        <Typography variant="subheading" color="inherit" className={classes.flex}>
                            The coolest app there ever was.
                        </Typography>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const styles = {
    landingContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        height: '300px',
        width: '100%',
        maxWidth: '900px'
    },
    splashContent: {
        marginTop: '100px',
        height: '100vh'
    },
    landingSplash: {
        width: '100%',
        backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

}

export default withStyles(styles)(Home)