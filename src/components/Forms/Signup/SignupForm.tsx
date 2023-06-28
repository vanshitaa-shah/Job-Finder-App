import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import previewImg from "../../../assets/preview.png";
import { useNavigate } from "react-router";
import { signupValidateSchema, signupValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./Signup.module.css";
import FormStyles from "../InputField/InputField.module.css";
import { ChangeEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { SignupValues } from "../../../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { error, success } from "../../../utils/Toaster";
import userServices from "../../../Firebase/user.services";
import { authActions } from "../../../store/authSlice";
import { uploadPhoto } from "../../../utils/functions/firebaseUtility";
import { handleProfilePreview } from "../../../utils/functions/profilePreview";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(previewImg);
  const role = useSelector((state: RootState) => state.auth.role);

  /* -------------------------- Submit method ------------------------------ */

  const onSubmit = async (values: SignupValues) => {
    // Uploading Profile photo into firebase storage
    const imgUrl = await uploadPhoto(values.profile);

    const userData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      profile: imgUrl,
      role: role,
      hasCompletedProfile: false,
    };

    try {
      // Firebase method of Authentication
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      // Adding User into Users collection
      await userServices.addUser({
        ...userData,
        applications: [] as String[],
      });

      success("User Added Successfully");
      navigate("/complete-profile");
      dispatch(authActions.authentication());
    } catch {
      error("User Already exist!");
    }
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
            {/* Field for Uploading Profile photo */}
            <div className={`${Styles.profile} ${FormStyles.formControl}`}>
              <label htmlFor="profile">Photo +</label>

              <Field
                type="file"
                name="profile"
                id="profile"
                value={undefined}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("profile", e.currentTarget.files?.[0]);
                  handleProfilePreview(e, setPreview);
                }}
                accept="Image/jpg,Image/png"
                hidden
              />

              {/* Preview */}
              <img
                id={Styles.preview}
                src={preview}
                width="50"
                height="50"
                alt=""
              />
              {/* Error message */}
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

            {/* Signup Button */}
            <Button
              variant="contained"
              type="submit"
              className={Styles.btn}
              id={Styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wait..." : "Signup"}
            </Button>

            {/* Reset Button */}
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
