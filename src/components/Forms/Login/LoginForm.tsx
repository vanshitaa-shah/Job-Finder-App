import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { loginValidateSchema, loginValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "../../../Layouts/Form/FormLayout.module.css";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { LoginValues } from "../../../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { authActions } from "../../../store/authSlice";
import userServices from "../../../Firebase/user.services";
import { error, success } from "../../../utils/Toaster";
import { findUserByEmail } from "../../../utils/functions/firebaseUtility";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);

  /* -------------------------- Submit method ------------------------------ */
  const onSubmit = (values: LoginValues) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;

        // Getting userID from email and getting user's data from users collection
        const id = await findUserByEmail(user.email!);
        const data = (await userServices.getUser(id!)).data();

        if (role && data?.role && data.role === role) {
          dispatch(authActions.authentication());
          success("User loggedIn successfully!");
          navigate("/all-jobs");
        } else {
          // Provider can't be authenticated as seeker and vice versa
          error("Invaild Access");
        }
      })

      .catch((err) => {
        // Errors given by Firebase Authentication
        if (err.code === "auth/user-not-found") error("User does not exist!");
        else if (err.code === "auth/wrong-password") error("Invalid Password!");
      });
  };

  return (
    <>
      <Formik
        initialValues={loginValues}
        validationSchema={loginValidateSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <InputField lable="Email" name="email" type="email" />

            <InputField lable="Password" name="password" type="password" />

            <Button
              variant="contained"
              type="submit"
              className={Styles.btn}
              id={Styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wait..." : "Login"}
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
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
