import * as firebase from 'firebase';


const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCC-ML5Koyp0P9asbEq_YJVkAad1V97BJ8",
    authDomain: "customer-db-f89f7.firebaseapp.com",
    databaseURL: "https://customer-db-f89f7.firebaseio.com",
    projectId: "customer-db-f89f7",
    storageBucket: "customer-db-f89f7.appspot.com",
    messagingSenderId: "310048018534",
    appId: "1:310048018534:web:d47dbe2557fbc8c4"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
 }

firebase.firestore().settings(settings);

export default firebase;