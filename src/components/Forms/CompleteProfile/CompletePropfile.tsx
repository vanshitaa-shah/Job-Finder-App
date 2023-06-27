import { Button, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Styles from "../../../Layouts/Form/FormLayout.module.css";
import FormStyles from "../InputField/InputField.module.css";
import ProfileStyles from "./CompleteProfile.module.css";
import InputField from "../InputField/InputField";
import { ChangeEvent, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import userServices from "../../../Firebase/user.services";
import { uploadResume } from "../../../utils/functions/firebaseUtility";
import { fetchUser } from "../../../store/userSlice";
import { error, success } from "../../../utils/Toaster";
import {
  CompleteProfileProps,
  seekerCompleteProfileProps,
} from "../../../Types/type";
import {
  completeProfileValidateSchema,
  completeProfileValues,
  resumeValidateSchema,
} from "../formvalidation";
import { handleResume } from "../../../utils/functions/ResumeHandler";

const CompletePropfile = () => {
  const [file, setFile] = useState<File | string>();
  const [fileName, setFileName] = useState<string>();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);
  const id = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch<AppDispatch>();

  /* -------------------------- Submit method ------------------------------ */
  const onsubmit = async (
    values: CompleteProfileProps & { hasCompletedProfile?: boolean }
  ) => {
    try {
      if (role === "seeker") {
        // Uploading Resume into firebase storage
        const resumeUrl = await uploadResume(
          (values as seekerCompleteProfileProps).resume
        );
        values = { ...values, resume: resumeUrl };
      }
      values = { ...values, hasCompletedProfile: true };

      // Updating doc in firebase
      await userServices.updateUser(id, values);
      dispatch(fetchUser(id));
      navigate("/all-jobs");
      success("Profile Completion successful!");
    } catch {
      error("Something Went Wrong");
    }
  };

  return (
    <>
      {/* Form for Provider Users */}
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
                {/* Provider User's address details */}
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

      {/* Form for Seeker User */}
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
                  {/* Field for uploading Resume */}
                  <div className={`${FormStyles.formControl}`}>
                    <label htmlFor="resume">
                      <span className={ProfileStyles.fileUpload}>
                        <DriveFolderUploadIcon />

                        <Typography variant="h6">
                          {fileName ? "Change File" : "Add File"}
                        </Typography>

                        {fileName !== undefined && (
                          <Typography>{fileName}</Typography>
                        )}
                      </span>
                    </label>

                    {/* Hidden field of File type */}
                    <Field
                      type="file"
                      name="resume"
                      id="resume"
                      value={undefined}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("resume", e.currentTarget.files?.[0]);
                        handleResume(e, setFile);
                        {
                          e.currentTarget.files?.[0] !== undefined &&
                            setFileName(e.currentTarget.files?.[0].name!);
                        }
                        setFile(e.currentTarget.files?.[0]);
                      }}
                      accept=".pdf"
                      hidden
                    />

                    {/* Error message */}
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
