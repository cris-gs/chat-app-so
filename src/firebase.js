import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOTPDA0hhynJ82WinuJmblemvsTQoaqic",
  authDomain: "chat-app-so.firebaseapp.com",
  projectId: "chat-app-so",
  storageBucket: "chat-app-so.appspot.com",
  messagingSenderId: "71850565407",
  appId: "1:71850565407:web:d07fdbe5ebe966e5055a2a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();