import { Edit, Delete } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import Styles from "./JobCard.module.css";
import { JobCardProps } from "../../Types/type";



const JobCard = ({ showDescription, applied }: JobCardProps) => {
  const navigate = useNavigate();
  const role: "provider" | "seeker" = "provider";
  return (
    <>
      <Card className={Styles.card}>
        <div className={Styles.cardHeader}>
          <Avatar className={Styles.avatar} />
          <Typography gutterBottom variant="h5">
            Simform Solutions
          </Typography>
        </div>
        <CardContent>
          <Typography>Job Title : ReactJs Developer</Typography>
          <Typography>Job Type : Intern</Typography>
          <Typography>Salary : 10,000</Typography>
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
                onClick={() => console.log("delete")}
              >
                <Delete />
              </IconButton>
            </>
          )}
          {/* {role === "seeker" && !applied && (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => showDescription(true)}
            >
              Apply
            </Button>
          )} */}
        </CardActions>
      </Card>
    </>
  );
};

export default JobCard;
