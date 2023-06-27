import * as Yup from "yup";
import { JobListingProps } from "../../Types/type";
export const loginValues = {
  email: "",
  password: "",
};

export const loginValidateSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Email Required!")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invaild Email Format!"
    ),
  password: Yup.string().trim().required("Password Required!"),
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
    .trim()
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
    .trim()
    .required("Phone Number Required!")
    .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid phone number!"),

  password: Yup.string()
    .trim()
    .min(6, "Weak Password!")
    .required("Password Required!"),

  confirmPassword: Yup.string()
    .trim()
    .required("Required!")
    .oneOf(
      [Yup.ref("password")],
      "Password and Confirm password does not match!"
    ),
});

// Job Listing Form Validation

export const jobListingValues: JobListingProps = {
  jobTitle: "",
  jobType: "",
  jobDescription: "",
  requirements: [""],
  salary: undefined,
};

export const jobListingValidateSchema = Yup.object({
  jobTitle: Yup.string()
    .trim()
    .max(20, "jobTitle too long!")
    .required("jobTitle Required!"),
  jobType: Yup.string().required("jobType Required!"),
  jobDescription: Yup.string().trim().required("jobDescription Required!"),
  requirements: Yup.array().of(
    Yup.string().trim().required("requirement must be added")
  ),
  salary: Yup.number().required("salary Required!"),
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
    street: Yup.string().trim().required("Street required!"),
    city: Yup.string().trim().required("City required!"),
    state: Yup.string().trim().required("State required!"),
  }),
});

export const resumeValidateSchema = Yup.object({
  resume: Yup.mixed().required("Resume Required!"),
});

export const editProfileProviderValidateSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(25, "Name too long!")
    .required("Name Required!"),

  profile: Yup.mixed().required("Profile photo Required!"),

  phone: Yup.string()
    .trim()
    .required("Phone Number Required!")
    .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid phone number!"),
  address: Yup.object().shape({
    street: Yup.string().trim().required("Street required!"),
    city: Yup.string().trim().required("City required!"),
    state: Yup.string().trim().required("State required!"),
  }),
});
export const editProfileSeekerValidateSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(20, "Name too long!")
    .required("Name Required!"),

  profile: Yup.mixed().required("Profile photo Required!"),

  phone: Yup.string()
    .trim()
    .required("Phone Number Required!")
    .matches(/^(\+91|0)?[6789]\d{9}$/, "Invalid phone number!"),
  resume: Yup.string().required("Resume required!"),
});
