// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ3kPMyeTZ4EUuykt6X_yE6fVSH-jPdXA",
  authDomain: "bookify-75d65.firebaseapp.com",
  projectId: "bookify-75d65",
  storageBucket: "bookify-75d65.firebasestorage.app",
  messagingSenderId: "188942846743",
  appId: "1:188942846743:web:20d85f7e1890b79c298552"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
