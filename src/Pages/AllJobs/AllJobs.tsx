import { Description } from "@mui/icons-material";
import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userSlice";

const AllJobs = () => {
  const id = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id) as any);
    }
  });

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
