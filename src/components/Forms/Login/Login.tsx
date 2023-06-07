import { Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Navbar from "../../Navbar/Navbar";
import { loginValidateSchema, loginValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FormLayout from "../../../Layouts/Form/FormLayout";
const Login = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/all-jobs");
  };
  return (
    <>
      <Navbar />

      <FormLayout>
        <Typography variant="h5">Login</Typography>
        <Formik
          initialValues={loginValues}
          validationSchema={loginValidateSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <InputField lable="Email" name="email" type="email" />

            <InputField lable="Password" name="password" type="password" />

            <Button
              variant="contained"
              type="submit"
              className={Styles.btn}
              id={Styles.submitBtn}
            >
              Login
            </Button>

            <Button
              variant="contained"
              color="error"
              type="reset"
              className={Styles.btn}
              id={Styles.resetBtn}
            >
              Reset
            </Button>
          </Form>
        </Formik>
        <p>
          Not Registered? <Link to="/signup">Signup</Link>
        </p>
      </FormLayout>
    </>
  );
};

export default Login;
