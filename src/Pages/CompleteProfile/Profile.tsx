import CompletePropfile from "../../components/Forms/CompleteProfile/CompletePropfile";
import FormLayout from "../../Layouts/Form/FormLayout";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <FormLayout>
        <CompletePropfile />
      </FormLayout>
    </>
  );
};

export default Profile;
