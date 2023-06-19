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
import { EditJobType } from "../Types/type";
import { db } from "./firebase";

const jobCollectionRef = collection(db, "jobs");
class JobDataService {
  addjob = (jobData: {}) => {
    return addDoc(jobCollectionRef, jobData);
  };
  updateJob = (id: string, newJobDoc: EditJobType) => {
    const jobDoc = doc(db, "jobs", id);
    if (jobDoc) return updateDoc(jobDoc, newJobDoc);
    else throw new Error("wrong");
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
