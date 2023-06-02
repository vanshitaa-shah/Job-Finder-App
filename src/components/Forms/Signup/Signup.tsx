import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import Navbar from "../../Navbar/Navbar";
import { signupValidateSchema, signupValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./Signup.module.css";
import Img from "../../../assets/signup.png";

const Signup = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    console.log("done");
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <div className={Styles.mainContainer}>
        <div className={Styles.container}>
          <div className={Styles.formContainer}>
            <Formik
              initialValues={signupValues}
              validationSchema={signupValidateSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <InputField name="name" type="name" />
                <InputField name="email" type="email" />
                <InputField name="phone" type="phone" />

                <InputField name="password" type="password" />
                <InputField name="confirmPassword" type="password" />

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
          <div className={Styles.imgContainer}>
            <img src={Img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
