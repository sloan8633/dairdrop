import React, {  } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Backdrop, Button, Grid, Card, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';

import airdropImg from '../media/airdropImg.png'

import { authActions } from '../_actions';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    btnLogin: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[800]
        }
    },
    cardLogin: {
        backgroundColor: '#272727',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2)
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -25,
    },
}));

function SignInPage({ userSession, signin }) {
    const dispatcher = useDispatch()
    const classes = useStyles();

    const handleLoginBtnClick = (e) => {
        e.preventDefault();
        dispatcher(authActions.signin(userSession))
    }
   
    return (
        <Backdrop className={classes.backdrop} open={true} >

            <Grid container justify='center'>
                <Grid container alignItems="center" justify="center">
                    <Grid item>
                        <img src={airdropImg} alt='airdropImg'></img>
                    </Grid>
                </Grid>
                <Grid item md={3} xs={10}>
                    <Card className={classes.cardLogin}>
                        <Typography variant='body1' style={{ color: grey[300] }}>
                            DAirdrop是一个运行在blockstack上的BTC空投发放和领取平台
                        </Typography>
                    </Card>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.btnLogin}
                        fullWidth
                        disabled={(signin && signin.request) || userSession.isSignInPending()}
                        onClick={handleLoginBtnClick}
                    >登陆</Button>
                    {Boolean((signin && signin.request) || userSession.isSignInPending())&& <CircularProgress size={50} className={classes.buttonProgress}></CircularProgress>}
                </Grid>
            </Grid>
        </Backdrop>
    )
}

function mapStateToProps(state) {
    const { signin } = state
    return {
        signin
    }
}

export default connect(mapStateToProps)(SignInPage)