import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddJobComponent from "../../components/Forms/AddJob/AddJobComponent";
import Navigation from "../../Layouts/Navigation/Navigation";
import { RootState } from "../../store";
import { fetchUser } from "../../store/userSlice";

const AddJob = ({ type }: { type?: string }) => {
  const id = useSelector((state: RootState) => state.auth.id);
  return (
    <>
      <Navigation component={<AddJobComponent type={type} />} />
    </>
  );
};

export default AddJob;
