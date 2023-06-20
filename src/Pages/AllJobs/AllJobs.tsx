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
import { fetchUsers } from "../../store/userSlice";
import { DescriptionType } from "../../Types/type";

const AllJobs = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const email = useSelector(
    (state: RootState) => state.user.currentUser?.email
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("here", email);

    if (email) {
      if (role === "seeker") {
        dispatch(fetchJobs() as any);
      } else dispatch(fetchJobsByEmail(email) as any);

      dispatch(fetchUsers() as any);
    }
  }, [email, role]);

  return (
    <>
      <Navigation component={<AllJobsComponent />} />
    </>
  );
};

const AllJobsComponent = () => {
  const [description, setDescription] = useState<DescriptionType>(
    {} as DescriptionType
  );
  const [showDescription, setShowDescription] = useState(false);
  const jobs = useSelector((state: RootState) => state.job.jobs);
  console.log(jobs);

  return (
    <>
      <ContainerLayout>
        <div className={Styles.jobsContainer}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              setDescription={setDescription}
              showDescription={setShowDescription}
              jobData={job}
            />
          ))}
        </div>
        {showDescription && (
          <div className={Styles.descriptionContainer}>
            <JobDescription
              showDescription={setShowDescription}
              descriptionData={description}
            />
          </div>
        )}
      </ContainerLayout>
    </>
  );
};

export default AllJobs;
