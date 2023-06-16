import { Description } from "@mui/icons-material";
import { useEffect, useState } from "react";
import JobCard from "../../components/Card/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsByEmail } from "../../store/jobSlice";

const AllJobs = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const email = useSelector((state: RootState) => state.user.currentUser.email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === "seeker") dispatch(fetchJobs() as any);
    else dispatch(fetchJobsByEmail(email) as any);
  }, []);

  return (
    <>
      <Navigation component={<AllJobsComponent />} />
    </>
  );
};

const AllJobsComponent = () => {
  const [showDescription, setShowDescription] = useState(false);
  const jobs = useSelector((state: RootState) => state.job.jobs);
  return (
    <>
      <ContainerLayout>
        <div className={Styles.jobsContainer}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              showDescription={setShowDescription}
              jobData={job}
            />
          ))}
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
