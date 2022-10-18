// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
      
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZRPGtD-zXfKYRy-98FwmFlD3WEZisKno",
    authDomain: "logicalfunnyquiz.firebaseapp.com",
    projectId: "logicalfunnyquiz",
    storageBucket: "logicalfunnyquiz.appspot.com",
    messagingSenderId: "109271917334",
    appId: "1:109271917334:web:92a74c465c489e78816637"
};
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveResult = (name, score, time) =>
    addDoc(collection(db, 'users'), {name: name, score:score, time:time})
//
export const getRanking = () => getDocs(collection(db, 'users'))