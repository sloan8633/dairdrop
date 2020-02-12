import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Divider, Typography } from '@material-ui/core';
import { Person } from 'blockstack';

import airdropImg from '../media/airdropImg.png'
import { LocalConfig } from '../LocalConfig';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    btnLogout: {
        backgroundColor: red[600],
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: red[900]
        },
        fontSize: 12
    },
    leftContentArea: {
        paddingLeft: theme.spacing(3)
    },
    username: { 
        paddingTop: theme.spacing(2)
    }
}));

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

function MainPage({ userSession, isSignin }) {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const [person, setPerson] = useState({
        name() {
            return 'Anonymous';
        },
        avatarUrl() {
            return avatarFallbackImage;
        },
    })

    const handleLogout = e => {
        e.preventDefault();
        userSession.signUserOut(window.location.origin);
    }

    useEffect(() => {
        if (isSignin) {
            setPerson(new Person(userSession.loadUserData().profile))
            LocalConfig.isShownLog && console.log(new Person(userSession.loadUserData().profile))

            enqueueSnackbar('登陆成功', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        }
        else {
            if (userSession.isSignInPending()) {
                enqueueSnackbar('登陆确认中', {
                    variant: 'warning',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
            }
            else {
                enqueueSnackbar('请使用Blockstack id登陆', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
            }
        }
    }, [])
    return (
        <>
            {!userSession.isSignInPending() &&
                <>
                    <Grid container alignItems='center' justify='center'>
                        
                        <Grid item xs={2} >
                            <Grid container alignItems='center' justify='center'>
                                <Grid item>
                                    <img src={airdropImg} alt='airdropImgIcon' style={{ width: 50 }}></img>
                                </Grid>
                            </Grid>
                        <Divider fullWidth></Divider>
                            
                        </Grid>
                        <Grid item xs={10}>

                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={2} className={classes.leftContentArea}>
                            <Grid container style={{ height: '90vh' }} alignContent='space-between'>
                                <Grid item xs={12}>
                                    <Typography variant='body2' className={classes.username}>
                                        你好{person.name() ? ', ' + person.name() : ''}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        onClick={handleLogout} 
                                        className={classes.btnLogout}
                                        color='secondary' 
                                        variant='contained'
                                        fullWidth
                                    >退出登陆</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={10}>

                        </Grid>
                    </Grid>
                </>

            }
        </>
    )
}

export default MainPage