import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Outlet, useNavigate } from "react-router";

const UnAuthenticatedRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role = useSelector((state: RootState) => state.auth.role);
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser?.hasCompletedProfile
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && hasCompletedProfile) {
      navigate("/all-jobs")
    }
    if(isAuth && !hasCompletedProfile){
      navigate("/complete-profile")
    }
  });
  return (
    <>
      {!isAuth && (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default UnAuthenticatedRoutes;
