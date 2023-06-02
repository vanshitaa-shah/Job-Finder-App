import { Typography } from "@mui/material";
import React from "react";
import Styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={Styles.navbar}>
      <Link to="/">
      <Typography variant="h5" color="white">
        Job Finder
      </Typography>
      </Link>
    </div>
  );
};

export default Navbar;
