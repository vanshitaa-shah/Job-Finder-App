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
  profile: "",
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

  profile: Yup.mixed()
    .test("fileSize", "Image size should be less than 2MB", (value: any) => {
      if (!value) {
        return true;
      }
      const maxSize = 2 * 1024 * 1024;
      return value.size <= maxSize;
    })
    .test(
      "fileType",
      "Invalid File Format!(should be jpg or png)",
      (value: any) => {
        if (!value) {
          return true;
        }
        const supportedTypes = ["image/jpeg", "image/png"];
        return supportedTypes.includes(value.type);
      }
    )
    .required("Profile photo Required!"),

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
  salary: Yup.string().required("salary Required!"),
});

// Complete Profile values

export const completeProfileValues = {
  address: {
    street: "",
    city: "",
    state: "",
  },
};

export const completeProfileValidateSchema = Yup.object({
  address: Yup.object().shape({
    street: Yup.string().required("Street required!"),
    city: Yup.string().required("City required!"),
    state: Yup.string().required("State required!"),
  }),
});

export const resumeValidateSchema = Yup.object({
  resume: Yup.mixed().required("Resume Required!"),
});

export const editProfileValidateSchema = Yup.object({
  name: Yup.string().max(20, "Name too long!").required("Name Required!"),

  email: Yup.string()
    .required("Email Required!")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invaild Email Format!"
    ),

  profile: Yup.mixed().required("Profile photo Required!"),

  phone: Yup.string()
    .required("Phone Number Required!")
    .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid phone number!"),
  street: Yup.string().required("Street required!"),
  city: Yup.string().required("City required!"),
  state: Yup.string().required("State required!"),
});
