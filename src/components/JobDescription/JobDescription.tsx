import { Avatar, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Styles from "./JobDescription.module.css";
import { JobDescriptionProps } from "../../Types/props";

const JobDescription = ({
  descriptionData,
  showDescription,
}: JobDescriptionProps) => {
  return (
    <>
      <div className={Styles.descriptionCard}>
        <IconButton
          color="error"
          className={Styles.close}
          onClick={() => showDescription(false)}
        >
          <Close />
        </IconButton>

        {/* Description Header */}
        <div className={Styles.descriptionHeading}>
          <Avatar className={Styles.avatar} src={descriptionData.profile} />
          <Typography variant="h5">{descriptionData.name}</Typography>
        </div>

        {/* Description Content */}
        <div className={Styles.content}>
          <Typography>
            <strong> Job Title : </strong>
            {descriptionData.jobTitle}
          </Typography>

          <Typography>
            <strong> Job Type : </strong>
            {descriptionData.jobType}
          </Typography>

          <Typography>
            <strong>Salary : </strong>
            {descriptionData.salary}
          </Typography>

          <Typography component="div">Description :</Typography>
          <Typography>{descriptionData.description}</Typography>

          <Typography component="div">Location:</Typography>
          <Typography>
            {descriptionData.street} , {descriptionData.city} ,{" "}
            {descriptionData.state}{" "}
          </Typography>

          {/* Requirements array into unordered List */}
          <Typography component="div"> Requirements :</Typography>
          <ul className={Styles.requirements}>
            {descriptionData.requirements.map((requirement, idx) => {
              return <li key={idx}>{requirement}</li>;
            })}
          </ul>

          <hr />

          <Typography>
            <strong> Contact Info </strong>
          </Typography>

          <Typography>
            <strong> Email : </strong>
            {descriptionData.email}
          </Typography>

          <Typography>
            <strong> Phone : </strong>
            {descriptionData.phone}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
