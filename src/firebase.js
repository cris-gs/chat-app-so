
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDEEHnKCxvTtW1sJCCBmBBvYe8bqoO-jJY",
  authDomain: "auth-dev-60d80.firebaseapp.com",
  projectId: "auth-dev-60d80",
  storageBucket: "auth-dev-60d80.appspot.com",
  messagingSenderId: "603798104228",
  appId: "1:603798104228:web:2e15db0fdf279eaff7de31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth() 

// storage users
export const storage = getStorage();

// fireStore users->messages
export const db = getFirestore(app);