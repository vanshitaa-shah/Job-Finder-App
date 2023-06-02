import ApplicantCard from "../../components/ApplicantCard/ApplicantCard";
import JobCard from "../../components/JobCard/JobCard";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import Navigation from "../../Layouts/Navigation/Navigation";
import Styles from "./Applicants.module.css";

const Applicants = () => {
  return (
    <>
      <Navigation component={<ApplicantsComponent />} />
    </>
  );
};

const ApplicantsComponent = () => {
  return (
    <>
  <ContainerLayout>
          <div className={Styles.applicantsContainer}>
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
          </div>
  </ContainerLayout>
    </>
  );
};

export default Applicants;
