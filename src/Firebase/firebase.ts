// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

const storage = getStorage();

export const uploadPhoto = async (uploadImg: any) => {
  const imageRef = ref(storage, `profilePhotos/ ${uploadImg.name}`);
  await uploadBytes(imageRef, uploadImg);
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};

export const uploadResume = async (uploadResume: any) => {
  const resumeRef = ref(storage, `resumes/ ${uploadResume.name}`);
  await uploadBytes(resumeRef, uploadResume);
  const downloadURL = await getDownloadURL(resumeRef);
  return downloadURL;
};
