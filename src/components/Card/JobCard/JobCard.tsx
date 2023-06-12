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
import { RootState } from "../../../store";
import { useNavigate } from "react-router";
import jobServices from "../../../Firebase/job.services";
import { fetchJobs, fetchJobsByEmail } from "../../../store/jobSlice";

const JobCard = ({
  setDescription,
  showDescription,
  applied,
  jobData,
}: JobCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);
  const email = useSelector(
    (state: RootState) => state.user.currentUser?.email
  );
  const users = useSelector((state: RootState) => state.user.users);

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
    if (email) dispatch(fetchJobsByEmail(email) as any);
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
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={descriptionHandler}
          >
            Read More
          </Button>
          {role === "provider" && (
            <>
              <IconButton
                color="primary"
                className={Styles.close}
                onClick={editJobHandler}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="primary"
                className={Styles.close}
                onClick={() => deleteJobHandler(jobData.id)}
              >
                <Delete />
              </IconButton>
            </>
          )}
          {role === "seeker" && !applied && (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => showDescription(true)}
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
