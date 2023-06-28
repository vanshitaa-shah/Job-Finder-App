import Styles from "./FormLayout.module.css";
import { LayoutProps } from "../../Types/props";

// FormLayout used in all forms
const FormLayout = ({ children }: LayoutProps) => {
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.container}>{children}</div>
    </div>
  );
};

export default FormLayout;
