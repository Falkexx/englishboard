// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrWIgc8ZXjEKzJsbJoSGBA4n8nPPMiQmg",
    authDomain: "englishboard-c566e.firebaseapp.com",
    projectId: "englishboard-c566e",
    storageBucket: "englishboard-c566e.appspot.com",
    messagingSenderId: "976027892909",
    appId: "1:976027892909:web:a8b8b618186ef779e11a24",
    measurementId: "G-VS5L3Y7WZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)