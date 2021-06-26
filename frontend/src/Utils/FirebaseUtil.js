import Firebase from 'firebase/app';

class FirebaseUtil{
    constructor(){
        if(Firebase.apps.length < 1){
            Firebase.initializeApp({
                apiKey: "AIzaSyCu8OQiSeO52PKU5tg6V_wnjA4jMYnFZZc",
                authDomain: "mailmonk-developersmonk.firebaseapp.com",
                projectId: "mailmonk-developersmonk",
                storageBucket: "mailmonk-developersmonk.appspot.com",
                messagingSenderId: "795419614739",
                appId: "1:795419614739:web:18d8eade215573d394e9e6",
                measurementId: "G-TC3YWVRSDM"
              });
        }
    }

    app(){
        return Firebase.app();
    }
}

export default FirebaseUtil;
