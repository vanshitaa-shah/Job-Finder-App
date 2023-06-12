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
          <div className={Styles.container}>
            <div className={Styles.leftCard}>
              <CardComponent  role="provider"/>
            </div>
            <div className={Styles.rightCard}>
            <CardComponent role="seeker"/>
            </div>
          </div>
        </div>
      </div>
        
    </>
  );
};

export default WelcomePage;
