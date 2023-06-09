import AddJobComponent from "../../components/Forms/AddJob/AddJobComponent";
import Navigation from "../../Layouts/Navigation/Navigation";

const AddJob = ({ type }: { type?: string }) => {
  return (
    <>
      <Navigation component={<AddJobComponent type={type} />} />
    </>
  );
};

export default AddJob;
