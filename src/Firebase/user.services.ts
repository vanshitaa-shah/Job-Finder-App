import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const userCollectionRef = collection(db, "users");

// All the Firebase services for users collections
class UserDataService {
  addUser = (userData: {}) => {
    return addDoc(userCollectionRef, userData);
  };

  updateUser = (id: string, updatedUser: {}) => {
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

export default new UserDataService();
