import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ApplicantCard from "../../components/Card/ApplicantCard/ApplicantCard";
import jobServices from "../../Firebase/job.services";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "./Applicants.module.css";
import MainStyles from "../../Layouts/Navigation/Navigation.module.css";
import Img from "../../assets/no-data.jpg";
import { Applicant } from "../../Types/type";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsByEmail } from "../../store/jobSlice";

const Applicants = () => {
  return (
    <>
      <Navigation component={<ApplicantsComponent />} />
    </>
  );
};

const ApplicantsComponent = () => {
  const email = useSelector(
    (state: RootState) => state.user.currentUser?.email
  )!;
  const jobId = useParams().id!;
  const [applicants, setApplicants] = useState<Applicant[]>([] as Applicant[]);
  const getJobData = async () => {
    const jobData = (await jobServices.getJob(jobId)).data();
    console.log("Applicants data ", jobData?.applicants);
    setApplicants(jobData?.applicants);
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getJobData();
  }, [jobId]);

  return (
    <>
      <ContainerLayout>
        <div className={Styles.applicantsContainer}>
          {!applicants[0] ? (
            <img src={Img} className={MainStyles.noData} />
          ) : (
            applicants.map((applicant, idx) => {
              return (
                <ApplicantCard
                  key={idx}
                  applicant={applicant}
                  allApplicants={applicants}
                  setApplicants={setApplicants}
                />
              );
            })
          )}
        </div>
      </ContainerLayout>
    </>
  );
};

export default Applicants;
