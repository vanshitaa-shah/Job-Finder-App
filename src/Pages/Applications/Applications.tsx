import { useEffect, useState } from "react";
import JobCard from "../../components/Card/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { fetchUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

const Applications = () => {
  const id = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchUser(id) as any);
  //   }
  // });
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
