import { Visibility } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import jobServices from "../../../Firebase/job.services";
import { RootState } from "../../../store";
import { Applicant, emailJSObj } from "../../../Types/types";
import { ApplicantCardProps } from "../../../Types/props";
import Styles from "./ApplicantCard.module.css";
import emailjs from "@emailjs/browser";
import { error, success } from "../../../utils/Toaster";

// EmailJS env variables
const serviceId: string = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
const templateId: string = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
const publicKey: string = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

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

  const sendEmail = (obj: emailJSObj) => {
    emailjs
      .send(serviceId, templateId, obj, publicKey)
      .then(() => success("Mail sent to the applicant successfully!"))
      .catch(() => error("Error in sending Mail!"));
  };

  // Logic for Job application Approval, mail will be sent via emailJS
  const jobApprovalHandler = async () => {
    const updatedArray: Applicant[] = allApplicants.map((data: Applicant) => {
      if (data.applicantEmail === applicant.applicantEmail)
        return { ...data, status: "approved" };
      return data;
    });
    setApplicants(updatedArray);
    await jobServices.updateJob(jobId!, { applicants: updatedArray });
    const jobData = (await jobServices.getJob(jobId!)).data()!;

    // details used while sending mail
    const obj: emailJSObj = {
      company_name: `${currentUser?.name}`,
      applicant_email: `${applicant.applicantEmail}`,
      applicant_name: `${applicantData.name}`,
      job_title: `${jobData.jobTitle}`,
      status: "Approved",
    };
    sendEmail(obj);
    setApplicants(updatedArray);
  };

  // Logic for Job application rejection, mail will be sent via emailJS
  const jobRejectionHandler = async () => {
    const updatedArray: Applicant[] = allApplicants.map((data: Applicant) => {
      if (data.applicantEmail === applicant.applicantEmail)
        return { ...data, status: "rejected" };
      return data;
    });

    setApplicants(updatedArray);
    await jobServices.updateJob(jobId!, { applicants: updatedArray });
    const jobData = (await jobServices.getJob(jobId!)).data()!;

    // details used while sending mail
    const obj: emailJSObj = {
      company_name: `${currentUser?.name}`,
      applicant_email: `${applicant.applicantEmail}`,
      applicant_name: `${applicantData.name}`,
      job_title: `${jobData.jobTitle}`,
      status: "Rejected",
    };
    sendEmail(obj);
  };

  return (
    <>
      <Card className={Styles.card}>
        {/* card header */}
        <div
          className={`${Styles.cardHeader} ${
            applicant.status !== "pending" &&
            (applicant.status === "approved"
              ? Styles.cardHeaderApproved
              : Styles.cardHeaderRejected)
          }`}
        >
          <Avatar className={Styles.avatar} src={applicantData.profile} />
        </div>

        {/* card content */}
        <CardContent>
          <Typography>Name : {applicantData.name}</Typography>
          <Typography>Email : {applicantData.email}</Typography>
          <Typography>Phone : {applicantData.phone}</Typography>
        </CardContent>

        {/* card Actions:view resume functionality */}
        <CardActions>
          <a href={applicantData.resume} target="_blank">
            <Button startIcon={<Visibility />}>Resume</Button>
          </a>
        </CardActions>

        {/* card Actions:Related to job application's status */}
        <CardActions>
          <Button
            variant="outlined"
            color="success"
            onClick={jobApprovalHandler}
            disabled={
              applicant.status === "approved" || applicant.status != "pending"
            }
          >
            {applicant.status === "approved" ? "approved" : "approve"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={jobRejectionHandler}
            disabled={
              applicant.status === "rejected" || applicant.status != "pending"
            }
          >
            {applicant.status === "rejected" ? "rejected" : "reject"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ApplicantCard;
