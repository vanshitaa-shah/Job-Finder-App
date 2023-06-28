import CompletePropfile from "../../components/Forms/CompleteProfile/CompletePropfile";
import FormLayout from "../../Layouts/Form/FormLayout";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Profile = () => {
  const navigate = useNavigate();
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile
  );

  useEffect(() => {
    // If profile already completed
    if (hasCompletedProfile) navigate("/all-jobs");
  }, [hasCompletedProfile]);

  return (
    <>
      {hasCompletedProfile !== undefined && !hasCompletedProfile && (
        <>
          <Navbar />
          <FormLayout>
            <CompletePropfile />
          </FormLayout>
        </>
      )}
    </>
  );
};

export default Profile;
