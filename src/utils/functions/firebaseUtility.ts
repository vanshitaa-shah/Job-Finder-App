import { getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { userCollectionRef } from "../../Firebase/user.services";

// Utility Functions for storing profile photos and resumes
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

// Utility function for users collection,getting userID with user's email
export const findUserByEmail = async (email: string) => {
  const q = query(userCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }
  const userDoc = querySnapshot.docs[0];
  return userDoc.id;
};
