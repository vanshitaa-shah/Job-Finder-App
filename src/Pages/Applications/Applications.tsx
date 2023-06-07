import { useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";

const Applications = () => {
  return (
    <>
      <Navigation component={<ApplicationsComponent />} />
    </>
  );
};

const ApplicationsComponent = () => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <>
      <ContainerLayout>
        <div className={Styles.jobsContainer}>
          <JobCard showDescription={setShowDescription} applied={true} />
          <JobCard showDescription={setShowDescription} applied={true} />
          <JobCard showDescription={setShowDescription} applied={true} />
          <JobCard showDescription={setShowDescription} applied={true} />
          <JobCard showDescription={setShowDescription} applied={true} />
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

export default Applications;
