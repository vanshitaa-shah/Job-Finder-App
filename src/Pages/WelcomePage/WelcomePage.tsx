import { Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import CardComponent from "../../components/Card/RoleSelecation/CardComponent";
import Styles from "./WelcomePage.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router";


const WelcomePage = () => {
  const isAuthenticated=useSelector((state:RootState)=>state.auth.isAuthenticated);
  const navigate=useNavigate();

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
  })
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
