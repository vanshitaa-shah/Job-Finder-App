import { Description } from "@mui/icons-material";
import { useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "./AllJobs.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";

const AllJobs = () => {
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
