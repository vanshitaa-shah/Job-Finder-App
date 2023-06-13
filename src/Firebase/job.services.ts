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

const jobCollectionRef = collection(db, "jobs");
class JobDataService {
  addjob = (jobData: {}) => {
    return addDoc(jobCollectionRef, jobData);
  };
}

export default new JobDataService();
