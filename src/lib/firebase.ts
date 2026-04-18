import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// --- THE GYM CULTURE (FINAL PROJECT) ---
const firebaseConfig = {
  apiKey: "AIzaSyDriLv7J5dFQ7s_gui2422IGeRQtuxSdFE",
  authDomain: "the-gym-culture-1092a.firebaseapp.com",
  projectId: "the-gym-culture-1092a",
  storageBucket: "the-gym-culture-1092a.firebasestorage.app",
  messagingSenderId: "68220805994",
  appId: "1:68220805994:web:8b25d81dfcbeb8d38f7b13"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
