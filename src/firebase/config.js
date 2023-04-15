// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
   
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrO6Ljw0IG-1ctIsBWaRJJV0lbZEA9iFY",
  authDomain: "react-journal-app-3311c.firebaseapp.com",
  projectId: "react-journal-app-3311c",
  storageBucket: "react-journal-app-3311c.appspot.com",
  messagingSenderId: "168252467509",
  appId: "1:168252467509:web:2847ea576f12e13c49847c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
