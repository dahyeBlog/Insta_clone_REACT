// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ-TPE_apvLMKHFMxV7o-381C4tUu2Id4",
  authDomain: "react-instagram-clone-876d6.firebaseapp.com",
  projectId: "react-instagram-clone-876d6",
  storageBucket: "react-instagram-clone-876d6.appspot.com",
  messagingSenderId: "55881612842",
  appId: "1:55881612842:web:fe3321e686e0d4fafbcd53",
  measurementId: "G-EXH7BSS95R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

const auth = getAuth()

export { auth }

export default db
