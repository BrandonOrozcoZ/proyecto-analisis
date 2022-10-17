import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
    apiKey: "AIzaSyDZRPGtD-zXfKYRy-98FwmFlD3WEZisKno",
    authDomain: "logicalfunnyquiz.firebaseapp.com",
    projectId: "logicalfunnyquiz",
    storageBucket: "logicalfunnyquiz.appspot.com",
    messagingSenderId: "109271917334",
    appId: "1:109271917334:web:92a74c465c489e78816637"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
