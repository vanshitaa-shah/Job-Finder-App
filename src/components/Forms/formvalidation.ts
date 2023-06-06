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

// Job Listing Form Validation

export const jobListingValues = {
  jobTitle: "",
  jobType: "",
  jobDescription: "",
  requirements: [""],
  address: {
    street: "",
    city: "",
    state: "",
  },
  salary: "",
};

export const jobListingValidateSchema = Yup.object({
  jobTitle: Yup.string()
    .max(20, "jobTitle too long!")
    .required("jobTitle Required!"),
  jobType: Yup.string().required("jobType Required!"),
  jobDescription: Yup.string().required("jobDescription Required!"),
  requirements: Yup.array().of(
    Yup.string().required("requirement must be added")
  ),

  address: Yup.object().shape({
    street: Yup.string().required("Street required!"),
    city: Yup.string().required("City required!"),
    state: Yup.string().required("State required!"),
  }),
  salary: Yup.string().required("salary Required!"),
});
