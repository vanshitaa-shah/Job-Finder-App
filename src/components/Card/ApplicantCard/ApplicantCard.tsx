import { Download, Delete } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Styles from "./ApplicantCard.module.css";

const ApplicantCard = ({ applicantEmail }: { applicantEmail: string }) => {
  const users = useSelector((state: RootState) => state.user.users);
  const applicantData = users.filter(
    (user) => user.email === applicantEmail
  )[0];
  const [isActionDone, setIsActionDone] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const jobApprovalHandler = () => {
    setIsActionDone(true);
    setIsApproved(true);
  };
  const jobRejectionHandler = () => {
    setIsActionDone(true);
    setIsRejected(true);
  };
  return (
    <>
      <Card className={Styles.card}>
        <div className={Styles.cardHeader}>
          <Avatar className={Styles.avatar} src={applicantData.profile} />
        </div>
        <CardContent>
          <Typography>Name : {applicantData.name}</Typography>
          <Typography>Email : {applicantData.email}</Typography>
          <Typography>Phone : {applicantData.phone}</Typography>
        </CardContent>
        <CardActions>
          <a href={applicantData.resume} target="_blank">
            <Button startIcon={<Download />}>Resume</Button>
          </a>
        </CardActions>
        <CardActions>
          <Button
            variant="outlined"
            color="success"
            onClick={jobApprovalHandler}
            disabled={isActionDone}
          >
            {isApproved ? "Approved" : "Approve"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={jobRejectionHandler}
            disabled={isActionDone}
          >
            {isRejected ? "Rejected" : "Reject"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ApplicantCard;
