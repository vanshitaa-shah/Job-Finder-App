import * as Yup from "yup";
export const loginValues = {
  email: "",
  password: "",
};

export const loginValidateSchema = Yup.object({
  email: Yup.string()
    .required("Email Required!")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invaild Email Format!"
    ),
  password: Yup.string().required("Password Required!"),
});

export const signupValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const signupValidateSchema = Yup.object({
  name: Yup.string().max(20, "Name too long!").required("Name Required!"),

  email: Yup.string()
    .required("Email Required!")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invaild Email Format!"
    ),

  phone: Yup.string()
    .required("Phone Number Required!")
    .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid phone number!"),

  password: Yup.string().required("Password Required!"),

  confirmPassword: Yup.string()
    .required("Required!")
    .oneOf(
      [Yup.ref("password")],
      "Password and Confirm password does not match!"
    ),
});
