// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuWhoGcIW--wSuT4v0LKRMFJfOQpLD56c",
  authDomain: "multi-client-app.firebaseapp.com",
  projectId: "multi-client-app",
  storageBucket: "multi-client-app.appspot.com",
  messagingSenderId: "300701872492",
  appId: "1:300701872492:web:6ab51cc4f5661e7a9ac349",
  measurementId: "G-V5864780ZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;
