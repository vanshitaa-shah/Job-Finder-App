// Job Type
export type Job = {
  id?: string;
  providerEmail: string;
  jobTitle: string;
  jobType: "Intern" | "Fresher" | "Experienced" | "";
  jobDescription: string;
  requirements: string[];
  salary: number;
  applicants: Applicant[];
};

// Job Description Type
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

// Applicant Type used in Jobs
export type Applicant = {
  applicantEmail: string;
  status: "pending" | "approved" | "rejected";
};

//Job seeker Type
export type JobSeeker = {
  name: string;
  email: string;
  profile: string;
  password: string;
  phone: string;
  resume?: string;
};

// Job provider Type
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

// Union Type of User
export type User = JobSeeker &
  JobProvider &
  Role & { hasCompletedProfile: boolean } & { applications: String[] };

/*------------------------------ Types Used in Redux slices state -------------------------------*/

export type AuthSliceType = {
  id: string;
  role: string;
  isAuthenticated: boolean;
};
// UserSlice State Type
export interface UserSliceType {
  users: User[];
  currentUser: User | null;
}

/*------------------------------------ Types Used in Forms -------------------------------------*/
export type LoginValues = { email: string; password: string };

export type SignupValues = {
  name: string;
  email: string;
  phone: string;
  profile: string;
  password: string;
  confirmPassword: string;
};

export type EditValues = {
  name: string;
  email?: string;
  profile: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
  };
  resume?: string;
};

export type EditJobType = {
  jobTitle: string;
  jobType: "Intern" | "Fresher" | "Experienced" | "";
  jobDescription: string;
  requirements: string[];
  salary: number;
};
