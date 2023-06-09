import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { RootState } from "../store";

const SeekerRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);
  const navigate = useNavigate();

  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile
  );

  useEffect(() => {
    if (!isAuth) {
      navigate("/signup");
    } else {
      if (hasCompletedProfile !== undefined && !hasCompletedProfile)
        navigate("/complete-profile");
      if (role === "provider") {
        navigate("/all-jobs");
      }
    }
  }, [isAuth, hasCompletedProfile]);

  return <>{role === "seeker" && hasCompletedProfile && <Outlet />}</>;
};

export default SeekerRoutes;
