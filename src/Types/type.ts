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
  profile: string;
  password: string;
  confirmPassword: string;
};

export type EditValues = {
  name?: string;
  companyName?: string;
  email: string;
  profile: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
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

type providerCompleteProfileProps = {
  address: {
    street: string;
    city: string;
    state: string;
  };
};
type seekerCompleteProfileProps = {
  resume: string;
};

export type CompleteProfileProps =
  | providerCompleteProfileProps
  | seekerCompleteProfileProps;

export type JobSeeker = {
  name?: string;
  email: string;
  profile: string;
  password: string;
  phone: string;
  resume?: string;
};

export type JobProvider = {
  companyName?: string;
  email: string;
  profile: string;
  password: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
  };
};

export type Role = {
  role?: "provider" | "seeker";
};

export type User = {
  currentUser: JobSeeker & JobProvider & Role;
};
