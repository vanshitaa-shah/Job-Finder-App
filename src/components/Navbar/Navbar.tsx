import { Typography } from "@mui/material";
import React from "react";
import Styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={Styles.navbar}>
      <Typography variant="h5" color="white">
        Job Finder
      </Typography>
    </div>
  );
};

export default Navbar;
