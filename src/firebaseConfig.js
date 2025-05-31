// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1_UTaumsgko1BuA1icg3EY9rvaxvNgoE",
  authDomain: "gringotts-bb246.firebaseapp.com",
  projectId: "gringotts-bb246",
  storageBucket: "gringotts-bb246.firebasestorage.app",
  messagingSenderId: "1024975783242",
  appId: "1:1024975783242:web:29e715afdb6bdb7c00edb3",
  measurementId: "G-N012CJG7L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const database = getFirestore(app)
