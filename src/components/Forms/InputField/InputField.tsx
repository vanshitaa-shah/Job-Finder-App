import { IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { ErrorMessage, Field, FieldArray } from "formik";
import Styles from "./InputField.module.css";
import { InputFieldProps } from "../../../Types/type";


// Reusable Component For all the Form Field
const InputField = ({ name, type, lable, as }: InputFieldProps) => {
  return (
    <div className={Styles.formControl}>
      <>
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
                      <IconButton
                        color="primary"
                        className={Styles.close}
                        onClick={() => push("")}
                      >
                        <Add />
                      </IconButton>
                      {index > 0 && (
                        <IconButton
                          color="primary"
                          className={Styles.close}
                          onClick={() => remove(index)}
                        >
                          <Remove />
                        </IconButton>
                      )}

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
