// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC55_bD19wHScf6SFl0QrgDXpgxC8CWgOs",

  authDomain: "gighub-c8dcf.firebaseapp.com",

  projectId: "gighub-c8dcf",

  storageBucket: "gighub-c8dcf.appspot.com",

  messagingSenderId: "600430772218",

  appId: "1:600430772218:web:46d53c414e5d0fff76ee43",

  measurementId: "G-8QPFC4QLR6"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;