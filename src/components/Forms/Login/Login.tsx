import { Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Navbar from "../../Navbar/Navbar";
import { loginValidateSchema, loginValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "../../../Layouts/Form/FormLayout.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FormLayout from "../../../Layouts/Form/FormLayout";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { LoginValues } from "../../../Types/type";
const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (values:LoginValues ) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        navigate("/all-jobs");
        console.log(user);
      })
      .catch((err) => console.log(err.message));
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
