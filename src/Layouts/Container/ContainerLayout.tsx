import Styles from './ContainerLayout.module.css'
import { LayoutProps } from '../../Types/type';


const ContainerLayout = ({children}:LayoutProps) => {
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
