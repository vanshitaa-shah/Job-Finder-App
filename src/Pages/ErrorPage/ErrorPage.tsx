import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={Styles.errorPage}>
      <div className={Styles.container}>
        <Typography variant="h5">404 Page Not Found!!</Typography>
        <Typography variant="h5">
          The requested page could not be found.
        </Typography>

        <Link to="/">
          <Button variant="contained">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
