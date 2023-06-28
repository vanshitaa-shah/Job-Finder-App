import Styles from "./ContainerLayout.module.css";
import { LayoutProps } from "../../Types/props";

// ContainerLayout used in all pages
const ContainerLayout = ({ children }: LayoutProps) => {
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.container}>{children}</div>
    </div>
  );
};

export default ContainerLayout;
