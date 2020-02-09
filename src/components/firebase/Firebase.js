import * as firebase from 'firebase';


const settings = { timestampsInSnapshots: true };

const config = {
    apiKey: "AIzaSyCZRnr5TKThtRolB_rrYeVqrezDlaMBYC4",
    authDomain: "buyback-app.firebaseapp.com",
    databaseURL: "https://buyback-app.firebaseio.com",
    projectId: "buyback-app",
    storageBucket: "buyback-app.appspot.com",
    messagingSenderId: "460126132060",
    appId: "1:460126132060:web:a6137d4f90908ad1"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;