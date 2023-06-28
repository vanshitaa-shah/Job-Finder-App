import FormLayout from "../../Layouts/Form/FormLayout";
import SignupForm from "../../components/Forms/Signup/SignupForm";
import Navbar from "../../components/Navbar/Navbar";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { error } from "../../utils/Toaster";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Signup = () => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role)!;

  useEffect(() => {
    // If Role not chosen
    if (role === "") {
      error("Choose your role!");
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <FormLayout>
        <Typography variant="h5">Signup</Typography>
        <SignupForm />
        <p>
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </FormLayout>
    </>
  );
};

export default Signup;
