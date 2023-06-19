import { Avatar, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Styles from "./JobDescription.module.css";
import { JobDescriptionProps } from "../../Types/type";

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
        <div className={Styles.descriptionHeading}>
          <Avatar className={Styles.avatar} src={descriptionData.profile} />
          <Typography variant="h5">{descriptionData.name}</Typography>
        </div>
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

          <Typography component="div"> Requirements :</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio
            similique. Necessitatibus tempora iusto cum, ducimus ipsam
            perspiciatis. Quo iste doloremque sequi sapiente, ab itaque
            exercitationem sunt quam deserunt error?
          </Typography>
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
