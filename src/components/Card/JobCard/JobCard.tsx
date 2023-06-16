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
import { JobCardProps } from "../../../Types/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router";
import jobServices from "../../../Firebase/job.services";
import { fetchJobs, fetchJobsByEmail } from "../../../store/jobSlice";

const JobCard = ({ showDescription, applied, jobData }: JobCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);
  const email = useSelector((state: RootState) => state.user.currentUser.email);
  const profilePhoto = useSelector(
    (state: RootState) => state.user.currentUser.profile
  );

  const deleteJobHandler = async (id: string) => {
    await jobServices.deleteJob(id);
    dispatch(fetchJobsByEmail(email) as any);
  };
  return (
    <>
      <Card className={Styles.card}>
        <div className={Styles.cardHeader}>
          <Avatar className={Styles.avatar} src={profilePhoto} />
          <Typography gutterBottom variant="h5">
            Simform Solutions
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
            onClick={() => showDescription(true)}
          >
            Read More
          </Button>
          {role === "provider" && (
            <>
              <IconButton
                color="primary"
                className={Styles.close}
                onClick={() => navigate("/edit-job")}
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
