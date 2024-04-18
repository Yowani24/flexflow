import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASURAMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAuWhoGcIW--wSuT4v0LKRMFJfOQpLD56c",
  authDomain: "multi-client-app.firebaseapp.com",
  projectId: "multi-client-app",
  storageBucket: "multi-client-app.appspot.com",
  messagingSenderId: "300701872492",
  appId: "1:300701872492:web:6ab51cc4f5661e7a9ac349",
  measurementId: "G-V5864780ZR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;
