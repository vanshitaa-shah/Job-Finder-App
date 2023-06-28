import React, { ReactNode, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Styles from "./Navigation.module.css";
import DrawerComponent from "./DrawerComponent";
import RenderComponent from "./RenderComponent";
import AppBarComponent from "./AppBarComponent";

const drawerWidth = 240;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
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

// sidebar will be defaultly closed if width< 768px and else opened
const sidebarHandler = () => {
  if (window.innerWidth > 768) {
    return true;
  } else {
    return false;
  }
};

export default function Navigation({ component }: { component: ReactNode }) {
  const [open, setOpen] = React.useState(sidebarHandler);

  // To open Sidebar
  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // To close Sidebar
  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
        <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
        <RenderComponent open={open} component={component} />
      </Box>
      {open && <div className={Styles.sliderBackground}></div>}
    </>
  );
}
