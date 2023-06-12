import { createSlice } from "@reduxjs/toolkit";

interface Job {
  // id: string;
  providerEmail: string;
  jobTitle: string;
  jobType: "Intern" | "Fresher" | "Experienced";
  jobDescription: string;
  requirements: string[];
  salary: number;
  applicants: string[];
}

const initialState: Array<Job> = [];
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
});

export const jobReducer = jobSlice.reducer;
export const jobActions = jobSlice.actions;
