import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { jobListingValidateSchema, jobListingValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./AddJobComponent.module.css";
import { Applicant, EditJobType, JobListingProps } from "../../../Types/type";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import jobServices from "../../../Firebase/job.services";
import { Job } from "../../../store/jobSlice";
import isEqual from "react-fast-compare";
import { error } from "../../../utils/Toaster";

const AddJobComponent = ({ type }: { type?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let editValues: EditJobType | null = null;
  const email = useSelector(
    (state: RootState) => state.user.currentUser?.email
  );
  if (type) {
    const jobData: Job = location.state.jobData;
    editValues = {
      jobTitle: jobData.jobTitle,
      jobType: jobData.jobType,
      jobDescription: jobData.jobDescription,
      requirements: jobData.requirements,
      salary: jobData.salary,
    };
  }

  const onsubmit = async (values: JobListingProps) => {
    if (type === "edit") {
      const jobData: Job = location.state.jobData;
      const id = jobData.id;
      const jobDoc = (await jobServices.getJob(id!)).data();
      if (
        jobDoc?.jobTitle === values.jobTitle &&
        jobDoc?.jobType === values.jobType &&
        jobDoc?.jobDescription === values.jobDescription &&
        jobDoc?.salary == values.salary &&
        isEqual(jobDoc?.requirements, values.requirements)
      ) {
        error("Nothing To Update!");
      } else {
        if (editValues) {
          if (id) await jobServices.updateJob(id, values);
        }
        navigate("/all-jobs");
      }
    } else {
      if (email) {
        const jobData = { ...values, providerEmail: email };
        const applicants = [] as Applicant[];
        await jobServices.addjob({ ...jobData, applicants: applicants });
      }
      navigate("/all-jobs");
    }
  };

  const onCancel = () => {
    if (type === "edit") {
      navigate("/all-jobs");
    }
  };

  return (
    <>
      <div className={Styles.container}>
        <Typography variant="h5">
          {type === "edit" ? "Edit" : "List"} A job
        </Typography>
        <div className={Styles.formContainer}>
          <Formik
            initialValues={type === "edit" ? editValues! : jobListingValues}
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
