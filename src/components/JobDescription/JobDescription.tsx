import { Avatar, IconButton, Typography } from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";
import Styles from "./JobDescription.module.css";

type JobDescriptionProps = {
  showDescription: React.Dispatch<React.SetStateAction<boolean>>;
};

const JobDescription = ({ showDescription }: JobDescriptionProps) => {
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
          <Avatar className={Styles.avatar} />
          <Typography variant="h5">Simform Solutions</Typography>
        </div>
        <div className={Styles.content}>
          <Typography>
            <strong> Job Title : </strong>ReactJs Developer
          </Typography>

          <Typography>
            <strong> Job Type : </strong> Intern
          </Typography>

          <Typography>
            <strong>Salary : </strong> 10,000
          </Typography>

          <Typography component="div">Description :</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio
            similique. Necessitatibus tempora iusto cum, ducimus ipsam
            perspiciatis. Quo iste doloremque sequi sapiente, ab itaque
            exercitationem sunt quam deserunt error? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Laboriosam consectetur libero error.
            Eveniet, id? Dolor, nisi soluta asperiores obcaecati velit voluptate
            nobis? Consectetur fuga voluptatem ducimus minima! Ipsa assumenda
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio
            similique. Necessitatibus tempora iusto cum, ducimus ipsam
            perspiciatis. Quo iste doloremque sequi sapiente, ab itaque
            exercitationem sunt quam deserunt error? Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Laboriosam consectetur libero error.
            Eveniet, id? Dolor, nisi soluta asperiores obcaecati velit voluptate
            nobis? Consectetur fuga voluptatem ducimus minima! Ipsa assumenda
            illum magni omnis. Iure sint quo distinctio nulla laboriosam ratione
            accusantium.
          </Typography>

          <Typography component="div">Location:</Typography>
          <Typography> 4th floor,Bsquare binori-2,Ahmedabad,Gujarat</Typography>

          <Typography component="div"> Requirements :</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odio
            similique. Necessitatibus tempora iusto cum, ducimus ipsam
            perspiciatis. Quo iste doloremque sequi sapiente, ab itaque
            exercitationem sunt quam deserunt error?
          </Typography>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
