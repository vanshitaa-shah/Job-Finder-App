import { ReactNode } from "react";
import { Job } from "../store/jobSlice";

export type NavigationProps = {
  component: JSX.Element;
};

export type JobCardProps = {
  showDescription: React.Dispatch<React.SetStateAction<boolean>>;
  setDescription: React.Dispatch<React.SetStateAction<DescriptionType>>;
  applicableJobs?: Job[];
  setApplicableJobs?: React.Dispatch<React.SetStateAction<Job[]>>;
  jobData: Job;
  applied?: boolean;
};

export type DescriptionType = {
  profile: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  state: string;
  city: string;
  jobTitle: string;
  jobType: "Intern" | "Fresher" | "Experienced" | "";
  salary: number;
  description: string;
  requirements: string[];
};

export type JobDescriptionProps = {
  descriptionData: DescriptionType;
  showDescription: React.Dispatch<React.SetStateAction<boolean>>;
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
  profile: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  resume?: string;
};

export type EditJobType = {
  jobTitle: string;
  jobType: "Intern" | "Fresher" | "Experienced" | "";
  jobDescription: string;
  requirements: string[];
  salary: number | undefined;
};

export type LoginValues = { email: string; password: string };

export type JobListingProps = {
  jobTitle: string;
  jobType: "Intern" | "Fresher" | "Experienced" | "";
  jobDescription: string;
  requirements: string[];
  salary: number | undefined;
};

export type LayoutProps = {
  children: ReactNode;
};

export type providerCompleteProfileProps = {
  address: {
    street: string;
    city: string;
    state: string;
  };
};

export type seekerCompleteProfileProps = {
  resume: string;
};

export type CompleteProfileProps =
  | providerCompleteProfileProps
  | seekerCompleteProfileProps;

export type JobSeeker = {
  name: string;
  email: string;
  profile: string;
  password: string;
  phone: string;
  resume?: string;
};

export type JobProvider = {
  name: string;
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

export type User = JobSeeker &
  JobProvider &
  Role & { hasCompletedProfile: boolean } & { applications: String[] };

export type UserSliceType = {
  users: User[];
  currentUser: User | null;
};

export type Applicant = {
  applicantEmail: string;
  status: "pending" | "approved" | "rejected";
};

export type ApplicantCardProps = {
  applicant: Applicant;
  allApplicants: Applicant[];
  setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>;
};
