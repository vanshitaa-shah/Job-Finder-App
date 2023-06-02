import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import Navbar from "../../Navbar/Navbar";
import { loginValidateSchema, loginValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./Login.module.css";
const Login = () => {
  const onSubmit = () => {
    console.log("done");
  };
  return (
    <>
      <Navbar />
      <div className={Styles.mainContainer}>
        <div className={Styles.container}>
          <div className={Styles.formContainer}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
