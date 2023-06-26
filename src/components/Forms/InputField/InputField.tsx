import { IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { ErrorMessage, Field, FieldArray } from "formik";
import Styles from "./InputField.module.css";
import { InputFieldProps } from "../../../Types/props";

// Reusable Component For all the Form Field
const InputField = ({ name, type, lable, as }: InputFieldProps) => {
  return (
    <div className={Styles.formControl}>
      <>
        {/* Input Field for textarea type (used in description of job)*/}
        {as === "textarea" && (
          <Field
            as={TextField}
            multiline
            minRows={5}
            maxRows={Infinity}
            name={name}
            id={name}
            label={lable}
          />
        )}

        {/* FieldArray For dynamically adding or removing elements from array (used in requirements[] of job)*/}
        {as === "FieldArray" && (
          <FieldArray
            name={name}
            render={(props) => {
              const { push, remove, form } = props;
              const { values } = form;
              const { requirements } = values;

              return (
                <div>
                  {requirements.map((requirement: string, index: number) => (
                    <div key={index} className={Styles.requirement}>
                      <Field
                        as={TextField}
                        type={type}
                        label={lable}
                        id={name}
                        name={`requirements[${[index]}]`}
                      />

                      {/* Add button for adding elements in array */}
                      <IconButton
                        color="primary"
                        className={Styles.close}
                        onClick={() => push("")}
                      >
                        <Add />
                      </IconButton>

                      {/* Remove element, only available if more than one elements are there */}
                      {index > 0 && (
                        <IconButton
                          color="primary"
                          className={Styles.close}
                          onClick={() => remove(index)}
                        >
                          <Remove />
                        </IconButton>
                      )}

                      {/* Error message */}
                      <ErrorMessage
                        name={`requirements.${index}`}
                        component="span"
                      />
                    </div>
                  ))}
                </div>
              );
            }}
          />
        )}

        {/* Input Field for Select Option (used in selection of jobType ) */}
        {as === "select" && (
          <Field
            as="select"
            className={Styles.jobType}
            type={type}
            label={lable}
            name={name}
            id={name}
          >
            <option value="">Select Type</option>
            <option value="Intern">Intern</option>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </Field>
        )}

        {/* Generalised Input field used in every form */}
        {!as && (
          <Field
            as={TextField}
            type={type}
            label={lable}
            name={name}
            id={name}
          />
        )}
        {as !== "FieldArray" && <ErrorMessage name={name} component={"p"} />}
      </>
    </div>
  );
};

export default InputField;
