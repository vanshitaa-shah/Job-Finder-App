import { Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import CardComponent from "../../components/Card/CardComponent";
import Styles from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <>
      <Navbar />
      <div className={Styles.mainContainer}>
        <div className={Styles.cardContainer}>
          <Typography variant="h5">Choose Your Role</Typography>
          <CardComponent />
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
