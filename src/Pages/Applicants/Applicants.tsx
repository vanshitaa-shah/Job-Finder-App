import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicantCard from "../../components/ApplicantCard/ApplicantCard";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import Navigation from "../../Layouts/Navigation/Navigation";
import { RootState } from "../../store";
import { fetchUser } from "../../store/userSlice";
import Styles from "./Applicants.module.css";

const Applicants = () => {
  const id = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id) as any);
    }
  });
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
