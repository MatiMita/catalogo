// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCEArbnhD4fbsG4-iqnQKj0YNE3gM6HtOc",
  authDomain: "clothes-app-3f831.firebaseapp.com",
  projectId: "clothes-app-3f831",
  storageBucket: "clothes-app-3f831.firebasestorage.app",
  messagingSenderId: "879557194096",
  appId: "1:879557194096:web:0eeee0a102c08a52e11fb5",
  measurementId: "G-79TWXXCQR8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { app, auth, db };

