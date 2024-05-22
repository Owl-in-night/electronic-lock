// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgFLlp8jkrdJoxcCnkf9hFmPehZMciXTo",
  authDomain: "electronic-lock-c0fce.firebaseapp.com",
  projectId: "electronic-lock-c0fce",
  storageBucket: "electronic-lock-c0fce.appspot.com",
  messagingSenderId: "799252198869",
  appId: "1:799252198869:web:03755c3332afe59dac795c",
  measurementId: "G-B0YTM64VZZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)