import { Button } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import InputField from "../../components/Forms/InputField/InputField";
import Styles from "../../components/Forms/Signup/Signup.module.css";
import EditStyles from "./EditProfile.module.css";
import FormLayout from "../../Layouts/Form/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  editProfileProviderValidateSchema,
  editProfileSeekerValidateSchema,
} from "../../components/Forms/formvalidation";
import { EditValues } from "../../Types/type";
import { useNavigate } from "react-router";
import userServices from "../../Firebase/user.services";
import { uploadPhoto, uploadResume } from "../../Firebase/firebase";
import Navigation from "../../Layouts/Navigation/Navigation";
import { fetchUser, userActions } from "../../store/userSlice";
import PreviewImg from "../../assets/preview.png";

const EditProfile = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const id = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch();
  return (
    <>
      {currentUser && currentUser.name !== "" && (
        <Navigation component={<EditProfileComponent />} />
      )}
    </>
  );
};
const EditProfileComponent = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const role = useSelector((state: RootState) => state.auth.role);
  const id = useSelector((state: RootState) => state.auth.id);
  const [preview, setPreview] = useState(currentUser?.profile || PreviewImg);
  const [profileChange, setProfileChange] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [resumeChange, setResumeChange] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let fileName: string;

  const editValues =
    currentUser &&
    (role === "provider"
      ? {
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          profile: currentUser.profile,
          address: {
            street: currentUser.address?.street,
            city: currentUser.address?.city,
            state: currentUser.address?.state,
          },
        }
      : {
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          profile: currentUser.profile,
          resume: currentUser.resume,
        });

  if (role === "seeker") {
    const firebaseUrl = currentUser?.resume!;
    const startMarker = "%20";
    const endMarker = "?";

    const startIndex = firebaseUrl.indexOf(startMarker) + startMarker.length;
    const endIndex = firebaseUrl.indexOf(endMarker);

    fileName = firebaseUrl.substring(startIndex, endIndex);

    console.log(fileName);
  }

  const handleProfilePreview = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("a");
        setPreview(reader.result as string);
      };
    }
  };
  const onsubmit = async (values: EditValues) => {
    console.log(values);
    if (profileChange) {
      const imgUrl = await uploadPhoto(values.profile);
      values = { ...values, profile: imgUrl };
    }
    if (resumeChange) {
      const resumeUrl = await uploadResume(values.resume);
      values = { ...values, resume: resumeUrl };
    }
    await userServices.updateUser(id, values);
    console.log("here");
    dispatch(userActions.updateData(values));
    navigate("/all-jobs");
  };

  return (
    <>
      <FormLayout>
        <Formik
          initialValues={editValues!}
          validationSchema={
            role === "provider"
              ? editProfileProviderValidateSchema
              : editProfileSeekerValidateSchema
          }
          onSubmit={onsubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div
                className={`${EditStyles.profile} ${EditStyles.formControl}`}
              >
                <label htmlFor="profile">Edit +</label>
                <Field
                  type="file"
                  name="profile"
                  id="profile"
                  value={undefined}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setProfileChange(true);
                    setFieldValue("profile", e.currentTarget.files?.[0]);
                    handleProfilePreview(e);
                  }}
                  accept="Image/jpg,Image/png"
                  hidden
                />
                <img
                  id={EditStyles.preview}
                  src={preview}
                  width="100"
                  height="100"
                  alt=""
                />
                <ErrorMessage name="profile" component="p" />
              </div>

              <InputField lable="Name" name="name" type="text" />
              <InputField lable="Email" name="email" type="email" />
              <InputField lable="Phone" name="phone" type="text" />
              {role === "provider" && (
                <>
                  <InputField
                    name="address.street"
                    lable="Street"
                    type="text"
                  />
                  <InputField name="address.city" lable="City" type="text" />
                  <InputField name="address.state" lable="State" type="text" />
                </>
              )}
              {role === "seeker" && (
                <div className={EditStyles.fileControl}>
                  <label htmlFor="resume">Resume</label>
                  <Field
                    type="file"
                    name="resume"
                    id="resume"
                    value={undefined}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setResumeChange(true);
                      setFieldValue("resume", e.currentTarget.files?.[0]);
                      setResumeName(e.currentTarget.files?.[0].name as string);
                    }}
                    accept=".pdf"
                  />
                  <span className={EditStyles.fileName}>
                    {resumeName || fileName}
                  </span>
                </div>
              )}

              <Button
                variant="contained"
                type="submit"
                className={Styles.btn}
                id={Styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wait..." : "Save"}
              </Button>

              <Button
                variant="contained"
                color="error"
                className={Styles.btn}
                id={Styles.resetBtn}
                onClick={() => navigate("/all-jobs")}
              >
                cancel
              </Button>
            </Form>
          )}
        </Formik>
      </FormLayout>
    </>
  );
};

export default EditProfile;
