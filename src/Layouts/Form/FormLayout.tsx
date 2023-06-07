import { ReactNode } from "react"
import Styles from "./FormLayout.module.css"

type FormLayoutProps = {
    children: ReactNode;
  };
const FormLayout = ({children}:FormLayoutProps) => {
  return (
    <div className={Styles.mainContainer}>
    <div className={Styles.container}>
        {children}
    </div>
      </div>
  )
}

export default FormLayout
