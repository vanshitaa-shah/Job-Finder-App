import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProviderRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile!
  );
  console.log(role);

  const navigate = useNavigate();

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
