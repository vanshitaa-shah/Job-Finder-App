import { useEffect } from "react";
import Navigation from "../../Layouts/Navigation/Navigation";
import { success } from "../../utils/Toaster";
import ApplicationsComponent from "../../components/Applications/ApplicationsComponent";

const Applications = () => {
  useEffect(() => {
    success("Check your mails for more info!");
  }, []);

  return (
    <>
      <Navigation component={<ApplicationsComponent />} />
    </>
  );
};

export default Applications;
