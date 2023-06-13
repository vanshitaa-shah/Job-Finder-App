import { Description } from "@mui/icons-material";
import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { onSnapshot } from "firebase/firestore";

const AllJobs = () => {
  // const id=useSelector((state:RootState)=>state.auth.id);
  // useEffect(()=>{
  //   if(id){
  //     const unsubscribe = onSnapshot(, (querySnapshot) =>
  //   }
  // },[id])
  return (
    <>
      <Navigation component={<AllJobsComponent />} />
    </>
  );
};

const AllJobsComponent = () => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <>
      <ContainerLayout>
        <div className={Styles.jobsContainer}>
          <JobCard showDescription={setShowDescription} />
          <JobCard showDescription={setShowDescription} />
          <JobCard showDescription={setShowDescription} />
          <JobCard showDescription={setShowDescription} />
          <JobCard showDescription={setShowDescription} />
        </div>
        {showDescription && (
          <div className={Styles.descriptionContainer}>
            <JobDescription showDescription={setShowDescription} />
          </div>
        )}
      </ContainerLayout>
    </>
  );
};

export default AllJobs;
