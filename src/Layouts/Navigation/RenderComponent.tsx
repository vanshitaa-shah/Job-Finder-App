import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import { Main } from "./Navigation";

const drawerWidth = 240;

// All the component passed to navigation Layout will be rendered here
const RenderComponent = ({
  open,
  component,
}: {
  open: boolean;
  component: ReactNode;
}) => {
  return <Main open={open}>{component}</Main>;
};

export default RenderComponent;
