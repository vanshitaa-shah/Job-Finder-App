import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar } from "@mui/material";
import Styles from "./Navigation.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Firebase/firebase";
import { signOut } from "firebase/auth";
import { authActions } from "../../store/authSlice";
import { userActions } from "../../store/userSlice";

const drawerWidth = 240;

// Drawer/sideBar Styles
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const DrawerComponent = ({
  open,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerClose: () => void;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const role = useSelector((state: RootState) => state.auth.role);
  const profile = useSelector(
    (state: RootState) => state.user.currentUser?.profile
  );

  // For Highlighting active link
  const isActive = (path: string) => {
    return location.pathname === path ? `${Styles.active}` : "";
  };

  // Firebase Authentication-Logout method
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(authActions.resetAuthInfo());
        dispatch(userActions.resetData());
        navigate("/");
      })
      .catch((error) => {
        error("Something Went Wrong!");
      });
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      className={Styles.slider}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Avatar className={Styles.avatar} src={profile} />

      {/* Navlinks For Provider Users */}
      {role == "provider" && (
        <>
          <Link to="/all-jobs" className={isActive("/all-jobs")}>
            All Jobs
          </Link>
          <Link to="/add-job" className={isActive("/add-job")}>
            Add Job
          </Link>
        </>
      )}

      {/* Navlinks For Seeker Users */}
      {role === "seeker" && (
        <>
          <Link to="/all-jobs" className={isActive("/all-jobs")}>
            All Jobs
          </Link>
          <Link to="/applications" className={isActive("/applications")}>
            Applications
          </Link>
        </>
      )}

      {/* Common Navlinks */}
      <Link to="/edit-profile" className={isActive("/edit-profile")}>
        Edit Profile
      </Link>
      <Link to="/" onClick={logout}>
        Logout
      </Link>
    </Drawer>
  );
};

export default React.memo(DrawerComponent);
