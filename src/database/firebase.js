// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

import "firebase/compat/auth";
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';
import { load } from 'dotenv';
import { getStorage } from "@firebase/storage";

require('dotenv').config();

//const firebaseConfig = process.env;
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

export const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app);

export const accessDB = app.firestore()
export const auth = app.auth()
export const storage = getStorage(app);
export const messaging = firebase.messaging();
export default db;