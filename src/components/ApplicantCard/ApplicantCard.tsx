import { Download, Delete } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Styles from "./ApplicantCard.module.css";

const ApplicantCard = () => {
  return (
    <>
      <Card className={Styles.card}>
        <div className={Styles.cardHeader}>
          <Avatar className={Styles.avatar} />
        </div>
        <CardContent>
          <Typography>Name : Vanshita Shah</Typography>
          <Typography>Job Title : ReactJs Developer</Typography>
          <Typography>Job Type : Intern</Typography>
        </CardContent>
        <CardActions>
          <Button startIcon={<Download />}>Resume</Button>
        </CardActions>
        <CardActions>
          <Button variant="outlined" color="success">
            Approve
          </Button>
          <Button variant="outlined" color="error">
            Reject
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ApplicantCard;
