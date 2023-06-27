import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { RootState } from "../store";

const AuthenticatedRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser, hasCompletedProfile);

    if (!isAuth) {
      navigate("/signup");
    } else {
      // navigate user to complete profile before accessing other routes
      if (hasCompletedProfile != undefined && !hasCompletedProfile) {
        navigate("/complete-profile");
      }
    }
  }, [isAuth, hasCompletedProfile]);

  return <>{isAuth && hasCompletedProfile != undefined && <Outlet />}</>;
};

export default AuthenticatedRoutes;
