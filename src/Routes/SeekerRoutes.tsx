import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { RootState } from "../store";

const SeekerRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile
  );
  console.log(hasCompletedProfile, currentUser, role);

  const navigate = useNavigate();

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
