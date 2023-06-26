import { Edit, Delete, Email } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import Styles from "./JobCard.module.css";
import { DescriptionType, JobCardProps } from "../../../Types/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useNavigate } from "react-router";
import jobServices from "../../../Firebase/job.services";
import { fetchJobs, fetchJobsByEmail } from "../../../store/jobSlice";
import userServices from "../../../Firebase/user.services";
import { fetchUser } from "../../../store/userSlice";
import { success } from "../../../utils/Toaster";
import { useEffect, useState } from "react";

const JobCard = ({
  setDescription,
  applicableJobs,
  setApplicableJobs,
  showDescription,
  applied,
  jobData,
}: JobCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const role = useSelector((state: RootState) => state.auth.role);
  const id = useSelector((state: RootState) => state.auth.id);
  const email = useSelector(
    (state: RootState) => state.user.currentUser?.email
  );
  const applications = useSelector(
    (state: RootState) => state.user.currentUser?.applications
  )!;
  const users = useSelector((state: RootState) => state.user.users);
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const [isdisabled, setIsDisabled] = useState(false);

  const providerUserData = users.find(
    (user) => user.email === jobData.providerEmail
  );

  const descriptionHandler = () => {
    showDescription(true);
    if (providerUserData) {
      const descriptionData: DescriptionType = {
        profile: providerUserData.profile,
        name: providerUserData.name,
        email: providerUserData.email,
        phone: providerUserData.phone,
        street: providerUserData.address!.street,
        state: providerUserData.address!.state,
        city: providerUserData.address!.city,
        jobTitle: jobData.jobTitle,
        jobType: jobData.jobType,
        salary: jobData.salary,
        description: jobData.jobDescription,
        requirements: jobData.requirements,
      };
      setDescription(descriptionData);
    }
  };

  const editJobHandler = () => {
    navigate(`/edit-job/${jobData.id}`, { state: { jobData } });
  };

  const deleteJobHandler = async (id: string) => {
    await jobServices.deleteJob(id);
    if (email) dispatch(fetchJobsByEmail(email));
  };

  const jobApplyHandler = async () => {
    setIsDisabled(true);
    if (email) {
      const allApplicants = [...jobData.applicants];
      const allApplicantions = [...applications];
      allApplicants.push({ applicantEmail: email, status: "pending" });
      await jobServices.updateJob(jobData.id!, { applicants: allApplicants });
      allApplicantions.push(jobData.id!);
      await userServices.updateUser(id, { applications: allApplicantions });
      const filteredJobs = applicableJobs?.filter(
        (job) => job.id != jobData.id
      );
      if (setApplicableJobs && filteredJobs) setApplicableJobs(filteredJobs);
      success(`Applied for ${jobData.jobTitle} in ${providerUserData?.name}!`);
      dispatch(fetchUser(id));
    }
  };

  return (
    <>
      <Card className={Styles.card}>
        <div className={Styles.cardHeader}>
          <Avatar className={Styles.avatar} src={providerUserData?.profile} />
          <Typography gutterBottom variant="h5">
            {providerUserData?.name}
          </Typography>
        </div>
        <CardContent>
          <Typography>Job Title : {jobData.jobTitle}</Typography>
          <Typography>Job Type : {jobData.jobType}</Typography>
          <Typography>Salary : {jobData.salary}</Typography>
        </CardContent>
        <CardActions className={Styles.actionBtns}>
          <Button size="small" color="primary" onClick={descriptionHandler}>
            Read More
          </Button>
          {role === "provider" && (
            <>
              <Button
                size="small"
                onClick={() => navigate(`/applicants/${jobData.id}`)}
              >
                View Applicants
              </Button>
              <IconButton color="primary" onClick={editJobHandler}>
                <Edit />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => deleteJobHandler(jobData.id!)}
              >
                <Delete />
              </IconButton>
            </>
          )}
          {role === "seeker" && !applied && (
            <Button
              size="small"
              color="primary"
              onClick={jobApplyHandler}
              disabled={isdisabled}
            >
              Apply
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default JobCard;
