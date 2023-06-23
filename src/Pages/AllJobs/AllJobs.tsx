import { useEffect, useState } from "react";
import JobCard from "../../components/Card/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsByEmail, Job } from "../../store/jobSlice";
import { DescriptionType } from "../../Types/type";
import Img from "../../assets/no-data.jpg";
import Loader from "../../components/Loader/Loader";
import { fetchUsers } from "../../store/userSlice";

const AllJobs = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const email = useSelector(
    (state: RootState) => state.user.currentUser?.email
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log("here", email);

    if (email) {
      if (role === "seeker") {
        dispatch(fetchJobs());
      } else dispatch(fetchJobsByEmail(email));

      dispatch(fetchUsers());
    }
  }, [email, role]);

  return (
    <>
      <Navigation component={<AllJobsComponent />} />
    </>
  );
};

const AllJobsComponent = () => {
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const users = useSelector((state: RootState) => state.user.users);
  const [showDescription, setShowDescription] = useState(false);
  const [applicableJobs, setApplicableJobs] = useState<Job[]>([] as Job[]);
  const [description, setDescription] = useState<DescriptionType>(
    {} as DescriptionType
  );
  const applications = useSelector(
    (state: RootState) => state.user.currentUser?.applications
  );

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => !applications?.includes(job.id!));
    console.log(filteredJobs);
    setApplicableJobs(filteredJobs);
  }, [jobs]);

  if (users[0]) {
    return (
      <>
        <ContainerLayout>
          <div className={Styles.jobsContainer}>
            {!applicableJobs[0] ? (
              <img src={Img} className={Styles.noData} />
            ) : (
              applicableJobs.map((job) => (
                <JobCard
                  key={job.id}
                  setDescription={setDescription}
                  showDescription={setShowDescription}
                  jobData={job}
                  applicableJobs={applicableJobs}
                  setApplicableJobs={setApplicableJobs!}
                />
              ))
            )}
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
  } else {
    return (
      <>
        <Loader />
      </>
    );
  }
};

export default AllJobs;
