import { Oval } from "react-loader-spinner";
import Styles from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      {/* loader spinner */}
      <Oval
        height={80}
        width={80}
        color="blue"
        wrapperClass={Styles.loaderContainer}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="rgba(243, 177, 90, 0.5)"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </>
  );
};

export default Loader;
