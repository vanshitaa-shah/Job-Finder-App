import { ReactNode } from "react";

export type NavigationProps = {
  component: JSX.Element;
};

export type JobDescriptionProps = {
  showDescription: React.Dispatch<React.SetStateAction<boolean>>;
};

export type JobCardProps = {
  showDescription: React.Dispatch<React.SetStateAction<boolean>>;
  applied?: boolean;
};

export type InputFieldProps = {
  name: string;
  type: string;
  lable: string;
  as?: string;
};
export type SignupValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type LoginValues = { email: string; password: string };

export type JobListingProps = {
  jobTitle: string;
  jobType: string;
  jobDescription: string;
  requirements: string[];
  salary: string;
};

export type LayoutProps = {
  children: ReactNode;
};

export type Role = "provider" | "seeker";
