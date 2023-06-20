import { Download, Delete } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import jobServices from "../../../Firebase/job.services";
import { RootState } from "../../../store";
import { Applicant, ApplicantCardProps } from "../../../Types/type";
import Styles from "./ApplicantCard.module.css";
import emailjs from "@emailjs/browser";

const ApplicantCard = ({
  applicant,
  allApplicants,
  setApplicants,
}: ApplicantCardProps) => {
  const users = useSelector((state: RootState) => state.user.users);
  const jobId = useParams().id;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const applicantData = users.filter(
    (user) => user.email === applicant.applicantEmail
  )[0];

  const [isActionDone, setIsActionDone] = useState(
    () => applicant.status !== "pending"
  );

  console.log(applicant.status);

  const jobApprovalHandler = async () => {
    setIsActionDone(true);
    const updatedArray: Applicant[] = allApplicants.map((data) => {
      if (data.applicantEmail === applicant.applicantEmail)
        return { ...data, status: "approved" };
      return data;
    });
    setApplicants(updatedArray);
    await jobServices.updateJob(jobId!, { applicants: updatedArray });
    const jobData = (await jobServices.getJob(jobId!)).data()!;
    const obj = {
      company_name: `${currentUser?.name}`,
      applicant_email: `${applicant.applicantEmail}`,
      applicant_name: `${applicantData.name}`,
      job_title: `${jobData.jobTitle}`,
      status: "Approved",
    };
    emailjs
      .send("service_yf4xgzi", "template_5jxg2gq", obj, "eQ6CurafOsxHONXPd")
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err, err.message));
    setApplicants(updatedArray);
  };

  const jobRejectionHandler = async () => {
    setIsActionDone(true);
    const updatedArray: Applicant[] = allApplicants.map((data) => {
      if (data.applicantEmail === applicant.applicantEmail)
        return { ...data, status: "rejected" };
      return data;
    });
    setApplicants(updatedArray);
    await jobServices.updateJob(jobId!, { applicants: updatedArray });
    const jobData = (await jobServices.getJob(jobId!)).data()!;
    const obj = {
      company_name: `${currentUser?.name}`,
      applicant_email: `${applicant.applicantEmail}`,
      applicant_name: `${applicantData.name}`,
      job_title: `${jobData.jobTitle}`,
      status: "Rejected",
    };
    emailjs
      .send("service_yf4xgzi", "template_5jxg2gq", obj, "eQ6CurafOsxHONXPd")
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err, err.message));
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
            {applicant.status === "approved" ? "approved" : "approve"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={jobRejectionHandler}
            disabled={isActionDone}
          >
            {applicant.status === "rejected" ? "rejected" : "reject"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ApplicantCard;
