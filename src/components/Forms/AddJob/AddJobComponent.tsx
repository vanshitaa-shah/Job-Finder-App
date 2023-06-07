import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { jobListingValidateSchema, jobListingValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./AddJobComponent.module.css";

const AddJobComponent = () => {
  const onsubmit = (values: {
    jobTitle: string;
    jobType: string;
    jobDescription: string;
    requirements: string[];
    address: {
      street: string;
      city: string;
      state: string;
    };
    salary: string;
  }) => {
    console.log(values);
  };
  return (
    <>
      <div className={Styles.container}>
        <Typography variant="h5">List A job</Typography>
        <div className={Styles.formContainer}>
          <Formik
            initialValues={jobListingValues}
            validationSchema={jobListingValidateSchema}
            onSubmit={onsubmit}
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
              {/* <InputField name="address.street" lable="Street" type="text" />
              <InputField name="address.city" lable="City" type="text" />
              <InputField name="address.state" lable="State" type="text" /> */}
              <InputField name="salary" lable="Salary" type="number" />

              <Button
                variant="contained"
                type="submit"
                className={Styles.btn}
                id={Styles.submitBtn}
              >
                Add Job
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
      </div>
    </>
  );
};

export default AddJobComponent;
