import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const jobCollectionRef = collection(db, "jobs");

class JobDataService {
  addjob = (jobData: {}) => {
    return addDoc(jobCollectionRef, jobData);
  };

  updateJob = (id: string, newJobDoc: {}) => {
    const jobDoc = doc(db, "jobs", id);
    if (jobDoc) return updateDoc(jobDoc, newJobDoc);
    else throw new Error("wrong");
  };

  deleteJob = (id: string) => {
    const jobDoc = doc(db, "jobs", id);
    return deleteDoc(jobDoc);
  };

  getJob = (id: string) => {
    const jobDoc = doc(db, "jobs", id);
    return getDoc(jobDoc);
  };

  getJobs = () => {
    return getDocs(jobCollectionRef);
  };
}

export default new JobDataService();
