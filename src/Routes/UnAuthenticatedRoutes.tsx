import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Outlet, Route, Routes, useNavigate } from "react-router";
import WelcomePage from "../Pages/WelcomePage/WelcomePage";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";

const UnAuthenticatedRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const hasCompletedProfile = useSelector(
    (state: RootState) => state.user.currentUser.hasCompletedProfile
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      if (hasCompletedProfile) navigate("/all-jobs");
      else navigate("/complete-profile");
    }
  }, [isAuth]);
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
