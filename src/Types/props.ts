import { ReactNode } from "react";
import { Applicant, DescriptionType, Job } from "./types";

// Props For Job Listing
export interface JobListingProps {
  jobTitle: string;
  jobType: "Intern" | "Fresher" | "Experienced" | "";
  jobDescription: string;
  requirements: string[];
  salary: number | "";
}

// Props For Job Card
export interface JobCardProps {
  showDescription: React.Dispatch<React.SetStateAction<boolean>>;
  setDescription: React.Dispatch<React.SetStateAction<DescriptionType>>;
  applicableJobs?: Job[];
  setApplicableJobs?: React.Dispatch<React.SetStateAction<Job[]>>;
  jobData: Job;
  applied?: boolean;
}

// Props For Job Description
export interface JobDescriptionProps {
  descriptionData: DescriptionType;
  showDescription: React.Dispatch<React.SetStateAction<boolean>>;
}

// Props For Applicant Card
export interface ApplicantCardProps {
  applicant: Applicant;
  allApplicants: Applicant[];
  setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>;
}

// Props for provider's complete profile
export interface providerCompleteProfileProps {
  address: {
    street: string;
    city: string;
    state: string;
  };
}

// Props for seeker's complete profile
export interface seekerCompleteProfileProps {
  resume: string;
}

// Union interface for profile completion
export type CompleteProfileProps =
  | providerCompleteProfileProps
  | seekerCompleteProfileProps;

// Props For Input Field
export interface InputFieldProps {
  name: string;
  type: string;
  lable: string;
  as?: string;
}

// Props for FilterComponent
export interface FilterProps {
  placeholder: string;
  options: [string, string, string];
  onSearch: (searchValue: string) => void;
  onOptionChange: (selectedOption: string) => void;
}

// Props for all the Layout
export interface LayoutProps {
  children: ReactNode;
}
