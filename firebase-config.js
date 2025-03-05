// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANVar2fpWss2LBiGCwzhyORUGyC4JFPMM",
  authDomain: "spin-and-win-happychews.firebaseapp.com",
  projectId: "spin-and-win-happychews",
  storageBucket: "spin-and-win-happychews.firebasestorage.app",
  messagingSenderId: "388453890903",
  appId: "1:388453890903:web:a4104c6c0a5f7a20149c12",
  measurementId: "G-WNDWEJG8MG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);