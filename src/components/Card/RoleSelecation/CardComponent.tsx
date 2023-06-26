import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Styles from "./CardComponent.module.css";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import Img from "../../../assets/logo.png";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";

const CardComponent = ({ role }: { role: string }) => {
  const dispatch = useDispatch();

  // Role selection
  const roleHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    const userRole = (e.target as HTMLDivElement).innerText;
    if (userRole === "JOB PROVIDER") {
      dispatch(authActions.addRole("provider"));
    } else {
      dispatch(authActions.addRole("seeker"));
    }
  };

  return (
    <>
      <Card className={Styles.card}>
        <Avatar className={Styles.avatar} src={Img} />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {role === "provider"
              ? "As a job provider,you'll be able to post job openings, attract talented individuals, and build a strong team!"
              : "As a job seeker, you'll have access to a wide range of opportunities find the perfect job that aligns with your skills"}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to="/signup">
            <Button
              variant="contained"
              size="small"
              onClick={(e) => roleHandler(e)}
            >
              {role === "provider" ? "Job Provider" : "Job Seeker"}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default CardComponent;
