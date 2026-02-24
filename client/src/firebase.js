// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key", // ✅ no quotes
  authDomain: "reactchat-4b799.firebaseapp.com",
  projectId: "reactchat-4b799",
  storageBucket: "reactchat-4b799.appspot.com",
  messagingSenderId: "875426896938",
  appId: "1:875426896938:web:927c558971017e3b1a7753",
};

// Initialize Firebase only if API key is provided
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization failed:", error);
  // Create mock auth object for development
  auth = null;
}

export { app, auth };
