import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8VwvATKWjpRDOpAXOGwb5HOQ3zZwbTZA",
  authDomain: "the-gym-culture-6313e.firebaseapp.com",
  projectId: "the-gym-culture-6313e",
  storageBucket: "the-gym-culture-6313e.firebasestorage.app",
  messagingSenderId: "1041446520040",
  appId: "1:1041446520040:web:99f7d61c7110c81ccf755d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
