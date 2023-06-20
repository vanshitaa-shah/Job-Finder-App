import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import ApplicantCard from "../../components/Card/ApplicantCard/ApplicantCard";
import jobServices from "../../Firebase/job.services";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import Navigation from "../../Layouts/Navigation/Navigation";
import { RootState } from "../../store";
import { fetchUser } from "../../store/userSlice";
import Styles from "./Applicants.module.css";

const Applicants = () => {
  const id = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch();
  return (
    <>
      <Navigation component={<ApplicantsComponent />} />
    </>
  );
};

const ApplicantsComponent = () => {
  const jobId = useParams().id!;
  const [applicants, setApplicants] = useState<string[]>([] as string[]);
  const getJobData = async () => {
    const jobData = (await jobServices.getJob(jobId)).data();
    setApplicants(jobData?.applicants);
  };

  useEffect(() => {
    getJobData();
  }, [jobId]);

  return (
    <>
      <ContainerLayout>
        <div className={Styles.applicantsContainer}>
          {applicants.map((applicant, idx) => {
            return <ApplicantCard key={idx} applicantEmail={applicant} />;
          })}
        </div>
      </ContainerLayout>
    </>
  );
};

export default Applicants;
