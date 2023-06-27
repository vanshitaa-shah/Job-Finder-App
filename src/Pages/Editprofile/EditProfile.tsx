import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Navigation from "../../Layouts/Navigation/Navigation";
import EditProfileComponent from "../../components/EditProfile/EditProfileComponent";

const EditProfile = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <>
      {currentUser && currentUser.name !== "" && (
        <Navigation component={<EditProfileComponent />} />
      )}
    </>
  );
};

export default EditProfile;
