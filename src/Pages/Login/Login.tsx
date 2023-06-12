import Navbar from "../../components/Navbar/Navbar";
import FormLayout from "../../Layouts/Form/FormLayout";
import LoginForm from "../../components/Forms/Login/LoginForm";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Navbar />
      <FormLayout>
        <Typography variant="h5">Login</Typography>
        <LoginForm/>
        <p>
          Not Registered? <Link to="/signup">Signup</Link>
        </p>
      </FormLayout>
    </>
  );
};

export default Login;
