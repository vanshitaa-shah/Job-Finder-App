import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA0h0I2ydD0zmPStCjZWdlwmtJzXgnc1Zo",
  authDomain: "job-finder-c6cc1.firebaseapp.com",
  projectId: "job-finder-c6cc1",
  storageBucket: "job-finder-c6cc1.appspot.com",
  messagingSenderId: "1021920899694",
  appId: "1:1021920899694:web:40c2343d18edbd97162c7f",
  measurementId: "G-E0E9KNTJJK",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
