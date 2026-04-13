import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCphkhPOcwbW7DXbVPgt1cC_L4_jhvOkaM",
  authDomain: "therapy-us.firebaseapp.com",
  projectId: "therapy-us",
  storageBucket: "therapy-us.firebasestorage.app",
  messagingSenderId: "295201993458",
  appId: "1:295201993458:web:a859204383f98ec628d66b",
  measurementId: "G-RPPXR44KWV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Export the database instance