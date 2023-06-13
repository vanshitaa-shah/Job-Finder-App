import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { RootState } from "../store";

const PrivateRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.auth.hasCompletedProfile
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!hasCompletedProfile) {
      if (!isAuth) navigate("/");
      else navigate("/complete-profile");
    }
  }, []);
  return <>{isAuth && <Outlet />}</>;
};

export default PrivateRoutes;
