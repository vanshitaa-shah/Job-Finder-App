import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { RootState } from "../store";

const AuthenticatedRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/signup");
    } else {
      if (hasCompletedProfile !== undefined && !hasCompletedProfile) {
        navigate("/complete-profile");
      }
    }
  }, [isAuth]);

  return <>{isAuth && <Outlet />}</>;
};

export default AuthenticatedRoutes;
