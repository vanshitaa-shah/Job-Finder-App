import { Button } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { ChangeEvent, useState } from "react";
import InputField from "../../components/Forms/InputField/InputField";
import Styles from "../../components/Forms/Signup/Signup.module.css";
import EditStyles from "../../Pages/Editprofile/EditProfile.module.css";
import FormLayout from "../../Layouts/Form/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { EditValues } from "../../Types/type";
import { useNavigate } from "react-router";
import userServices from "../../Firebase/user.services";
import { userActions } from "../../store/userSlice";
import PreviewImg from "../../assets/preview.png";
import { error } from "../../utils/Toaster";
import isEqual from "react-fast-compare";
import {
  editProfileProviderValidateSchema,
  editProfileSeekerValidateSchema,
} from "../../components/Forms/formvalidation";
import {
  uploadPhoto,
  uploadResume,
} from "../../utils/functions/firebaseUtility";
import { handleProfilePreview } from "../../utils/functions/profilePreview";

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
    // Edit Values for Provider
    (role === "provider"
      ? {
          name: currentUser.name,
          phone: currentUser.phone,
          profile: currentUser.profile,
          address: {
            street: currentUser.address?.street,
            city: currentUser.address?.city,
            state: currentUser.address?.state,
          },
        }
      : // Edit Values for Seeker
        {
          name: currentUser.name,
          phone: currentUser.phone,
          profile: currentUser.profile,
          resume: currentUser.resume,
        });

  // Utility:Get file Name from firebase URL
  if (role === "seeker") {
    const firebaseUrl = currentUser?.resume!;
    const startMarker = "%20";
    const endMarker = "?";

    const startIndex = firebaseUrl.indexOf(startMarker) + startMarker.length;
    const endIndex = firebaseUrl.indexOf(endMarker);

    fileName = firebaseUrl
      .substring(startIndex, endIndex)
      .replace(startMarker, "");
  }

  /* -------------------------- Submit method ------------------------------ */
  const onsubmit = async (values: EditValues) => {
    const userDoc = (await userServices.getUser(id)).data();
    if (
      userDoc?.name == values.name &&
      userDoc?.phone == values.phone &&
      userDoc?.profile == values.profile &&
      isEqual(userDoc?.address, values.address) &&
      userDoc?.resume == values.resume
    ) {
      // If nothing changed in updation
      error("Nothing to update!");
    } else {
      if (profileChange) {
        // uploading and getting url of profile photo
        const imgUrl = await uploadPhoto(values.profile);
        values = { ...values, profile: imgUrl };
      }

      if (resumeChange) {
        // uploading and getting url of resume
        const resumeUrl = await uploadResume(values.resume);
        values = { ...values, resume: resumeUrl };
      }

      await userServices.updateUser(id, values);
      dispatch(userActions.updateData(values));
      navigate("/all-jobs");
    }
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
              {/* Field for changing Profile photo */}
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
                    handleProfilePreview(e, setPreview);
                  }}
                  accept="Image/jpg,Image/png"
                  hidden
                />
                {/* Preview */}
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
              <InputField lable="Phone" name="phone" type="text" />

              {/* For Provider users, address is there in form */}
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

              {/* For Seeker users, resume field is there in form */}
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

export default EditProfileComponent;
