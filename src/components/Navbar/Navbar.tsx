import { Button, Typography } from "@mui/material";
import Styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { RootState } from "../../store";
import { userActions } from "../../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const logout = () => {
    // Firebase method for user logout
    signOut(auth).then(() => {
      dispatch(authActions.resetAuthInfo());
      dispatch(userActions.resetData());
      navigate("/");
    });
  };

  return (
    <div className={Styles.navbar}>
      <Link to="/">
        <Typography variant="h5" color="white">
          Job Finder
        </Typography>
      </Link>

      {isAuth && (
        <Button variant="contained" color="error" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Navbar;
