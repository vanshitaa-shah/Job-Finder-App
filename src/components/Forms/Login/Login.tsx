import { Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Navbar from "../../Navbar/Navbar";
import { loginValidateSchema, loginValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/all-jobs");
  };
  return (
    <>
      <Navbar />
      <div className={Styles.mainContainer}>
        <div className={Styles.container}>
          <div className={Styles.formContainer}>
            <Typography variant="h5">Login</Typography>
            <Formik
              initialValues={loginValues}
              validationSchema={loginValidateSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <InputField name="email" type="email" />

                <InputField name="password" type="password" />

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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
