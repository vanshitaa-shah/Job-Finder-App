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
import { ChangeEvent, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useNavigate } from "react-router";

const CompletePropfile = () => {
  const [file, setFile] = useState<File>();
  const navigate = useNavigate();
  const role: "seeker" | "provider" = "seeker";

  const onsubmit = () => {
    navigate("/all-jobs");
  };

  return (
    <>
      {/* {role === "provider" && (
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
                <Button variant="contained">View/Edit Profile</Button>
                <Button variant="contained">Next</Button>
              </Form>
            </Formik>
          </div>
        </>
      )} */}
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
                        <span>{file?.name}</span>
                      </span>
                    </label>

                    <Field
                      type="file"
                      name="resume"
                      id="resume"
                      value={undefined}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("resume", e.currentTarget.files?.[0]);
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
                    sx={{ margin: "20px" }}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                  <Button variant="contained">View/Edit Profile</Button>
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
