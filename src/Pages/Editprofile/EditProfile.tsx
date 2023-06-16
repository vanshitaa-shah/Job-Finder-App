import { Button } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import InputField from "../../components/Forms/InputField/InputField";
import Styles from "../../components/Forms/Signup/Signup.module.css";
import EditStyles from "./EditProfile.module.css";
import FormLayout from "../../Layouts/Form/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { editProfileValidateSchema } from "../../components/Forms/formvalidation";
import { EditValues } from "../../Types/type";
import { useNavigate } from "react-router";
import userServices from "../../Firebase/user.services";
import { authActions } from "../../store/authSlice";
import { uploadPhoto } from "../../Firebase/firebase";
import Navigation from "../../Layouts/Navigation/Navigation";
import { fetchUser } from "../../store/userSlice";
import PreviewImg from "../../assets/preview.png";

const EditProfile = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const id = useSelector((state: RootState) => state.auth.id);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchUser(id) as any);
  //   }
  // }, [id]);
  return (
    <>
      {currentUser.name !== "" && (
        <Navigation component={<EditProfileComponent />} />
      )}
    </>
  );
};
const EditProfileComponent = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const role = useSelector((state: RootState) => state.auth.role);
  const id = useSelector((state: RootState) => state.auth.id);
  const [preview, setPreview] = useState(currentUser.profile || PreviewImg);
  const [profileChange, setProfileChange] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editValues = {
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    profile: currentUser.profile,
    street: currentUser.address?.street,
    city: currentUser.address?.city,
    state: currentUser.address?.state,
    resume: currentUser.resume,
  };

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
    if (profileChange) {
      const imgUrl = await uploadPhoto(values.profile);
      values = { ...values, profile: imgUrl };
    }

    await userServices.updateUser(id, values);
    console.log("here");

    navigate("/all-jobs");
  };

  return (
    <>
      <FormLayout>
        <Formik
          initialValues={editValues}
          validationSchema={editProfileValidateSchema}
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
                  <InputField name="street" lable="Street" type="text" />
                  <InputField name="city" lable="City" type="text" />
                  <InputField name="state" lable="State" type="text" />
                </>
              )}
              {role === "seeker" && <></>}

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
