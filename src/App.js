import React, { useEffect, useState } from 'react';
import { UserSession, AppConfig } from 'blockstack'
import './App.css';
import SignInPage from './pages/SignInPage';
import MainPage from './pages/MainPage';
import { LocalConfig } from './LocalConfig';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

function App({ }) {
    const [isSignin, setIsSignIn] = useState(userSession.isUserSignedIn())
    
    useEffect(() => {
        if (userSession.isSignInPending()) {
            LocalConfig.isShownLog && console.log('check si signin or not')
            userSession.handlePendingSignIn().then((userData) => {
                window.history.replaceState({}, document.title, "/")
                setIsSignIn(userSession.isUserSignedIn())
                window.location.reload()
            });
        }
        else{
            setIsSignIn(userSession.isUserSignedIn())
        }
       
    }, [])

    return (
        <>
            {!isSignin && <SignInPage userSession={userSession} ></SignInPage> }
            <MainPage userSession={userSession} isSignin={isSignin}></MainPage>


        </>
    );
}

export default App;
