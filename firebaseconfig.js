// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhCRyRIguqHpBKSBg5kknNC9P9WRPsNg4",
  authDomain: "chatapp-a2d27.firebaseapp.com",
  projectId: "chatapp-a2d27",
  storageBucket: "chatapp-a2d27.appspot.com",
  messagingSenderId: "873741151101",
  appId: "1:873741151101:web:b221cf3e1579e65503ba14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth,db }
