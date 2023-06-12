import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { CompleteProfileProps, EditValues } from "../Types/type";
import { db } from "./firebase";

const userCollectionRef = collection(db, "users");
class UserDataService {
  // addUser
  addUser = (userData: {}) => {
    return addDoc(userCollectionRef, userData);
  };

  updateUser = (
    id: string,
    updatedUser:
      | (CompleteProfileProps & { hasCompletedProfile?: boolean })
      | EditValues
  ) => {
    const userDoc = doc(db, "users", id);
    if (userDoc) return updateDoc(userDoc, updatedUser);
    else throw new Error("wrong");
  };

  getUser = (id: string) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };

  getUsers = () => {
    return getDocs(userCollectionRef);
  };
}

export const findUserByEmail = async (email: string) => {
  const q = query(userCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }
  const userDoc = querySnapshot.docs[0];
  return userDoc.id;
};

export default new UserDataService();
