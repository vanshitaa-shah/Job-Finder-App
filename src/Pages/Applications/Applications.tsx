import { useEffect, useState } from "react";
import JobCard from "../../components/Card/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { fetchUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { DescriptionType } from "../../Types/type";
import { Job } from "../../store/jobSlice";
import Img from "../../assets/no-data.jpg";
import Loader from "../../components/Loader/Loader";

const Applications = () => {
  return (
    <>
      <Navigation component={<ApplicationsComponent />} />
    </>
  );
};

const ApplicationsComponent = () => {
  const [description, setDescription] = useState<DescriptionType>(
    {} as DescriptionType
  );
  const applications = useSelector(
    (state: RootState) => state.user.currentUser?.applications
  );

  const [showDescription, setShowDescription] = useState(false);
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([] as Job[]);

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => applications?.includes(job.id!));
    console.log(applications, filteredJobs);

    setAppliedJobs(filteredJobs);
  }, [jobs]);

  if (appliedJobs != undefined)
    return (
      <>
        <ContainerLayout>
          <div className={Styles.jobsContainer}>
            {!appliedJobs[0] ? (
              <img src={Img} className={Styles.noData} />
            ) : (
              appliedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  setDescription={setDescription}
                  showDescription={setShowDescription}
                  jobData={job}
                  applied={true}
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
  else {
    return <></>;
  }
};

export default Applications;
