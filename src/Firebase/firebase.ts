// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0h0I2ydD0zmPStCjZWdlwmtJzXgnc1Zo",
  authDomain: "job-finder-c6cc1.firebaseapp.com",
  projectId: "job-finder-c6cc1",
  storageBucket: "job-finder-c6cc1.appspot.com",
  messagingSenderId: "1021920899694",
  appId: "1:1021920899694:web:40c2343d18edbd97162c7f",
  measurementId: "G-E0E9KNTJJK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

// export { app, auth };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore"

// const firebaseConfig = {
//   apiKey: "AIzaSyCRIZlGgQ6sdfLgmdseGZQn0CsVfkvFNfk",
//   authDomain: "job-portal-cf65b.firebaseapp.com",
//   projectId: "job-portal-cf65b",
//   storageBucket: "job-portal-cf65b.appspot.com",
//   messagingSenderId: "118133720157",
//   appId: "1:118133720157:web:86de24c3ee65989900f9b4",
//   measurementId: "G-ZQSWERZYK4"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db=getFirestore(app)
// export const auth = getAuth();
