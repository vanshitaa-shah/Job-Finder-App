import { Typography } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import CardComponent from "./CardComponent";
import Styles from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <>
      <Navbar />
      <div className={Styles.mainContainer}>
        <div className={Styles.cardContainer}>
          <Typography variant="h5">Choose your role</Typography>
          <CardComponent />
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
