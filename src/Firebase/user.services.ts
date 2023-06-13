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
import { db } from "./firebase";

const userCollectionRef = collection(db, "users");
class UserDataService {
  // addUser
  addUser = (userData: {}) => {
    return addDoc(userCollectionRef, userData);
  };

  updateUser = (id: string, updatedUser: any) => {
    const userDoc = doc(db, "users", id);
    if (userDoc) return updateDoc(userDoc, updatedUser);
    else throw new Error("wrong");
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
