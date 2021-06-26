import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import FirebaseUtil from '../../Utils/FirebaseUtil';


export default function LoginScreen(){
    const FirebaseApp = new FirebaseUtil().app();
    var firebaseui = require('firebaseui');
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (auth, redirect) => {
                console.log('Auth',auth);
                firebase.auth().currentUser.getIdToken().then(token => {
                    console.log('Id Token: ', token);
                }).catch(err => {
                    console.log('Id Token(err): ', err);
                })
            },
            signInFailure: (err) => {
                alert('Error Signing you in');
                console.error('Signin error', err);
            },
            uiShown: () => {

            }
        },
        signInFlow: "popup",
        signInSuccessUrl: false,
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            }
        ]
    };
    useEffect(() => {
        if(firebaseui.auth.AuthUI.getInstance()) {
            const ui = firebaseui.auth.AuthUI.getInstance()
            ui.start('#FirebasePreBuildUIHolder', uiConfig)
        } else {
            const ui = new firebaseui.auth.AuthUI(firebase.auth())
            ui.start('#FirebasePreBuildUIHolder', uiConfig)
        }
    }, []);

    return(
        <MainContainer>
            <Dialog id="FirebasePreBuildUIHolder">
                
            </Dialog>
        </MainContainer>
    );
}


const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
`;

const Dialog = styled.div`
    width: calc(100% - 40px);
    max-width: 400px;
    height: 90%;
    max-height: 600px;
    padding: 20px;
    background: white;
`;