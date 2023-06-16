import {
  addDoc,
  collection,
  deleteDoc,
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
  deleteJob = (id: string) => {
    const jobDoc = doc(db, "jobs", id);
    return deleteDoc(jobDoc);
  };
  getJobs = () => {
    return getDocs(jobCollectionRef);
  };
}

export default new JobDataService();
