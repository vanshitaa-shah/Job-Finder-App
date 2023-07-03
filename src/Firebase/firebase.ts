import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config env variables
const apiKey: string = import.meta.env.VITE_APP_FIREBASE_API_KEY;
const authDomain: string = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN;
const projectId: string = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID;
const storageBucket: string = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId: string = import.meta.env
  .VITE_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId: string = import.meta.env.VITE_APP_FIREBASE_APP_ID;
const measurementId: string = import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID;

// Firebase config
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
