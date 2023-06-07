import { ReactNode } from 'react';
import Styles from './ContainerLayout.module.css'

type ContainerLayoutProps = {
    children: ReactNode;
  };
const ContainerLayout = ({children}:ContainerLayoutProps) => {
  return (
    <div className={Styles.mainContainer}>
        <div className={Styles.filterSection}>Filter</div>
        <div className={Styles.container}>
            {children}
        </div>
    </div>
  )
}

export default ContainerLayout
