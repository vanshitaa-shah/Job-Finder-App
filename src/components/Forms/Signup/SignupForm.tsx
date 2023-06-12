import { Button, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import previewImg from "../../../assets/preview.png";
import { useNavigate } from "react-router";
import Navbar from "../../Navbar/Navbar";
import { signupValidateSchema, signupValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./Signup.module.css";
import FormStyles from "../InputField/InputField.module.css";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import FormLayout from "../../../Layouts/Form/FormLayout";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { SignupValues } from "../../../Types/type";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/userSlice";

const SignupForm = () => {
  const [preview, setPreview] = useState(previewImg);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfilePreview = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result as string);
      };
    }
  };

  const onSubmit = (values: SignupValues) => {
    console.log(values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        console.log(user);
        dispatch(userActions.createNewUser({ ...values, profile: preview }));
        navigate("/complete-profile");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      
        <Formik
          initialValues={signupValues}
          validationSchema={signupValidateSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className={`${Styles.profile} ${FormStyles.formControl}`}>
                <label htmlFor="profile">Photo +</label>
                <Field
                  type="file"
                  name="profile"
                  id="profile"
                  value={undefined}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("profile", e.currentTarget.files?.[0]);
                    handleProfilePreview(e);
                  }}
                  accept="Image/jpg,Image/png"
                  hidden
                />
                <img
                  id={Styles.preview}
                  src={preview}
                  width="50"
                  height="50"
                  alt=""
                />
                <ErrorMessage name="profile" component="p" />
              </div>
              <InputField lable="Name" name="name" type="name" />
              <InputField lable="Email" name="email" type="email" />
              <InputField lable="Phone" name="phone" type="phone" />

              <InputField lable="Password" name="password" type="password" />
              <InputField
                lable="Confirm Password"
                name="confirmPassword"
                type="password"
              />

              <Button
                variant="contained"
                type="submit"
                className={Styles.btn}
                id={Styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wait..." : "Signup"}
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

export default SignupForm;
