import Navbar from "../../components/Navbar/Navbar";
import FormLayout from "../../Layouts/Form/FormLayout";
import LoginForm from "../../components/Forms/Login/LoginForm";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { error } from "../../utils/Toaster";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Login = () => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role)!;

  useEffect(() => {
    // If rile not chosen
    if (role === "") {
      error("Choose your role!");
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <FormLayout>
        <Typography variant="h5">Login</Typography>
        <LoginForm />
        <p>
          Not Registered? <Link to="/signup">Signup</Link>
        </p>
      </FormLayout>
    </>
  );
};

export default Login;
