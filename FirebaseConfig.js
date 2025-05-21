// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZshliU5UjgIxzZ7J170S6rVjZe8M4EOE",
  authDomain: "innovators-hub-music-55d34.firebaseapp.com",
  projectId: "innovators-hub-music-55d34",
  storageBucket: "innovators-hub-music-55d34.firebasestorage.app",
  messagingSenderId: "249225758414",
  appId: "1:249225758414:web:bcd493903aa6eb4934329f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __AUTH=getAuth(firebaseApp)
export const __DB=getFirestore(firebaseApp)
