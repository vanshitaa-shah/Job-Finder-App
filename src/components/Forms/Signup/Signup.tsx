import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import previewImg from "../../../assets/preview.png";
import { useNavigate } from "react-router";
import Navbar from "../../Navbar/Navbar";
import { signupValidateSchema, signupValues } from "../formvalidation";
import InputField from "../InputField/InputField";
import Styles from "./Signup.module.css";
import Img from "../../../assets/signup.png";
import { ChangeEvent, useState } from "react";

const Signup = () => {
  const [preview, setPreview] = useState(previewImg);
  const navigate = useNavigate();

  const handleProfilePreview = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result as string);
      };
    }
  };

  const onSubmit = () => {
    console.log("done");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className={Styles.mainContainer}>
        <div className={Styles.container}>
            <Formik
              initialValues={signupValues}
              validationSchema={signupValidateSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className={`${Styles.profile}`}>
                    <label htmlFor="profile">Photo +</label>
                    <Field
                      type="file"
                      name="profile"
                      id="profile"
                      value={undefined}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("profile", e.currentTarget.files?.[0]);
                        handleProfilePreview(e);
                      }}
                      accept="Image/jpg,Image/png"
                      hidden
                    />
                    <img
                      id={Styles.preview}
                      src={preview}
                      width="50"
                      height="50"
                      alt=""
                    />
                    <ErrorMessage name="profile" component="p" />
                  </div>
                  <InputField name="name" type="name" />
                  <InputField name="email" type="email" />
                  <InputField name="phone" type="phone" />

                  <InputField name="password" type="password" />
                  <InputField name="confirmPassword" type="password" />

                  <Button
                    variant="contained"
                    type="submit"
                    className={Styles.btn}
                    id={Styles.submitBtn}
                  >
                    Login
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
              )}
            </Formik>
          </div>
        </div>
     
    </>
  );
};

export default Signup;
