import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { jobListingValidateSchema, jobListingValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./AddJobComponent.module.css";
import { JobListingProps } from "../../../Types/type";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import jobServices from "../../../Firebase/job.services";

const AddJobComponent = ({ type }: { type?: string }) => {
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.user.currentUser.email);
  const onsubmit = async (values: JobListingProps) => {
    if (type === "edit") {
      console.log("type edit");
      navigate("/all-jobs");
    } else {
      const jobData = { ...values, providerEmail: email };
      await jobServices.addjob(jobData);
      // const jobs = await jobServices.getJobs();
      // console.log(jobs.docs.filter((doc) => console.log(doc.data())));

      navigate("/all-jobs");
    }
  };

  const onCancel = () => {
    if (type === "edit") {
      navigate("/all-jobs");
    }
  };

  const editValues = {
    jobTitle: "a",
    jobType: "Intern",
    jobDescription: "a",
    requirements: ["abc", "xyz"],
    salary: "123",
  };
  return (
    <>
      <div className={Styles.container}>
        <Typography variant="h5">
          {type === "edit" ? "Edit" : "List"} A job
        </Typography>
        <div className={Styles.formContainer}>
          <Formik
            initialValues={type === "edit" ? editValues : jobListingValues}
            validationSchema={jobListingValidateSchema}
            onSubmit={onsubmit}
            enableReinitialize={true}
          >
            <Form>
              <InputField name="jobTitle" lable="Job Title" type="text" />
              <InputField
                as="select"
                name="jobType"
                lable="Job Type"
                type="text"
              />
              <InputField
                name="jobDescription"
                lable="Job Description"
                type="textarea"
                as="textarea"
              />
              <InputField
                as="FieldArray"
                name="requirements"
                lable="Requirements"
                type="text"
              />

              <InputField name="salary" lable="Salary" type="number" />

              <Button
                variant="contained"
                type="submit"
                className={Styles.btn}
                id={Styles.submitBtn}
              >
                {type === "edit" ? "Save" : "Add Job"}
              </Button>

              <Button
                variant="contained"
                color="error"
                type="reset"
                className={Styles.btn}
                id={Styles.resetBtn}
                onClick={onCancel}
              >
                {type === "edit" ? "Cancel" : "Reset"}
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddJobComponent;
