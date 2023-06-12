import { Button, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Styles from "../../../Layouts/Form/FormLayout.module.css";
import FormStyles from "../InputField/InputField.module.css";
import ProfileStyles from "./CompleteProfile.module.css";
import InputField from "../InputField/InputField";
import {
  completeProfileValidateSchema,
  completeProfileValues,
  resumeValidateSchema,
} from "../formvalidation";
import { ChangeEvent, useEffect, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  CompleteProfileProps,
  seekerCompleteProfileProps,
} from "../../../Types/type";
import { RootState } from "../../../store";
import userServices, { findUserByEmail } from "../../../Firebase/user.services";
import { auth, uploadResume } from "../../../Firebase/firebase";
import { authActions } from "../../../store/authSlice";
import { fetchUser } from "../../../store/userSlice";
import { error, success } from "../../../utils/Toaster";

const CompletePropfile = () => {
  const [file, setFile] = useState<File | string>();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);
  const id = useSelector((state: RootState) => state.auth.id);
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile
  );
  const dispatch = useDispatch();

  const handleResume = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFile(reader.result as string);
      };
    }
  };

  const onsubmit = async (
    values: CompleteProfileProps & { hasCompletedProfile?: boolean }
  ) => {
    try {
      if (role === "seeker") {
        const resumeUrl = await uploadResume(
          (values as seekerCompleteProfileProps).resume
        );
        values = { ...values, resume: resumeUrl };
      }
      values = { ...values, hasCompletedProfile: true };
      await userServices.updateUser(id, values);
      dispatch(fetchUser(id) as any);
      navigate("/all-jobs");
      success("Profile Completion successful!");
    } catch {
      error("Something Went Wrong");
    }
  };

  return (
    <>
      {role === "provider" && (
        <>
          <Typography variant="h5">
            Please enter your company's Adderess
          </Typography>
          <div className={Styles.formContainer}>
            <Formik
              initialValues={completeProfileValues}
              validationSchema={completeProfileValidateSchema}
              onSubmit={onsubmit}
            >
              <Form>
                <InputField name="address.street" lable="Street" type="text" />
                <InputField name="address.city" lable="City" type="text" />
                <InputField name="address.state" lable="State" type="text" />
                <Button variant="contained" type="submit">
                  Next
                </Button>
              </Form>
            </Formik>
          </div>
        </>
      )}
      {role === "seeker" && (
        <>
          <Typography variant="h5">Please Upload your Resume</Typography>
          <div className={ProfileStyles.container}>
            <Formik
              initialValues={{ resume: "" }}
              validationSchema={resumeValidateSchema}
              onSubmit={onsubmit}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form>
                  <div className={`${FormStyles.formControl}`}>
                    <label htmlFor="resume">
                      <span className={ProfileStyles.fileUpload}>
                        <DriveFolderUploadIcon />
                        <Typography variant="h6">Add File</Typography>
                      </span>
                    </label>

                    <Field
                      type="file"
                      name="resume"
                      id="resume"
                      value={undefined}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("resume", e.currentTarget.files?.[0]);
                        handleResume(e);
                        setFile(e.currentTarget.files?.[0]);
                      }}
                      accept=".pdf"
                      hidden
                    />
                    <ErrorMessage name="resume" component="p" />
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ margin: "20px 130px" }}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default CompletePropfile;
