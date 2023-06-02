import { TextField } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import Styles from "./InputField.module.css";

interface InputFieldProps {
  name: string;
  type: string;
}
// Reusable Component For all the Form Field
const InputField = ({ name, type }: InputFieldProps) => {
  return (
    <div className={Styles.formControl}>
      <Field as={TextField} type={type} label={name} name={name} id={name} />
      <ErrorMessage name={name} component={"p"} />
    </div>
  );
};

export default InputField;
