import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProviderRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);
  const navigate = useNavigate();

  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile!
  );

  useEffect(() => {
    if (!isAuth) {
      navigate("/signup");
    } else {
      if (hasCompletedProfile !== undefined && !hasCompletedProfile)
        navigate("/complete-profile");
      if (role === "seeker") {
        navigate("/all-jobs");
      }
    }
  }, []);

  return <>{role === "provider" && hasCompletedProfile && <Outlet />}</>;
};

export default ProviderRoutes;
