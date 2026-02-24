// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: "reactchat-4b799.firebaseapp.com",
  projectId: "reactchat-4b799",
  storageBucket: "reactchat-4b799.appspot.com",
  messagingSenderId: "875426896938",
  appId: "1:875426896938:web:927c558971017e3b1a7753",
};

// Initialize Firebase
let app = null;
let auth = null;
let firebaseEnabled = false;

try {
  if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "demo-key") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    firebaseEnabled = true;
  } else {
    console.warn("Firebase not configured. Authentication features will be disabled.");
  }
} catch (error) {
  console.warn("Firebase initialization failed:", error);
}

export { app, auth, firebaseEnabled };
