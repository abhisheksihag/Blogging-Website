// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { apiKey } from "../../keys";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjKsWSd2EDAbRWMTbd1HUowXvoEybGRfA",
  authDomain: "blogreact-6f823.firebaseapp.com",
  projectId: "blogreact-6f823",
  storageBucket: "blogreact-6f823.appspot.com",
  messagingSenderId: "110373211661",
  appId: "1:110373211661:web:aed479f0c9803548e3cf44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)