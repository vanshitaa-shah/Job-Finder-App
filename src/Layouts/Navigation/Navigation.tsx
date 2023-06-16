import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar, Button } from "@mui/material";
import Styles from "./Navigation.module.css";
import { Link, useNavigate } from "react-router-dom";
import { NavigationProps, Role } from "../../Types/type";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Firebase/firebase";
import { signOut } from "firebase/auth";
import { authActions } from "../../store/authSlice";
import { userActions } from "../../store/userSlice";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const sidebarHandler = () => {
  if (window.innerWidth > 768) {
    return true;
  } else {
    return false;
  }
};
export default function Navigation({ component }: NavigationProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(sidebarHandler);
  const role = useSelector((state: RootState) => state.auth.role);
  const profile = useSelector(
    (state: RootState) => state.user.currentUser.profile
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(authActions.resetAuthInfo());
        dispatch(userActions.resetData());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} className={Styles.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={Styles.toggleButton}
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Job Finder
            </Typography>
          </Toolbar>
        </AppBar>
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
          {role == "provider" && (
            <>
              <Link to="/all-jobs">All Jobs</Link>
              <Link to="/add-job">Add Job</Link>
              <Link to="/applicants">Applicants</Link>
            </>
          )}
          {role === "seeker" && (
            <>
              <Link to="/all-jobs">All Jobs</Link>
              <Link to="/applications">Applications</Link>
            </>
          )}
          <Link to="/edit-profile">Edit Profile</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {component}
        </Main>
      </Box>
      {open && <div className={Styles.sliderBackground}> a</div>}
    </>
  );
}
