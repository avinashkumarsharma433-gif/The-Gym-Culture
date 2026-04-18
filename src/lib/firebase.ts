import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// --- IMPORTANT: COPY YOUR REAL APP CONFIG FROM FIREBASE CONSOLE ---
// Path: Project Settings -> General -> Your Apps -> SDK Setup and Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu5brBvmaDNvyoA3Obf4lnNFy2-O9pJKQ", // Nayi API Key
  authDomain: "the-gym-culture-622897864202.firebaseapp.com",
  projectId: "the-gym-culture-622897864202",
  storageBucket: "the-gym-culture-622897864202.firebasestorage.app",
  messagingSenderId: "622897864202",
  // PASTE YOUR REAL appId FROM FIREBASE CONSOLE HERE
  appId: "1:1041446520040:web:99f7d61c7110c81ccf755d" 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
