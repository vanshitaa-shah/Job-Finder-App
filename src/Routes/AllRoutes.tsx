import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import AddJob from "../Pages/AddJob/AddJob";
import AllJobs from "../Pages/AllJobs/AllJobs";
import Applicants from "../Pages/Applicants/Applicants";
import Applications from "../Pages/Applications/Applications";
import Profile from "../Pages/CompleteProfile/Profile";
import EditProfile from "../Pages/Editprofile/EditProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import WelcomePage from "../Pages/WelcomePage/WelcomePage";
import { RootState } from "../store";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";
import ProviderRoutes from "./ProviderRoutes";
import SeekerRoutes from "./SeekerRoutes";

const AllRoutes = () => {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <>
      <Routes>
        <Route path="" element={<UnAuthenticatedRoutes />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="" element={<AuthenticatedRoutes />}>
          <Route path="complete-profile" element={<Profile />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="" element={<ProviderRoutes />}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="edit-job/:id" element={<AddJob type="edit" />} />
            <Route path="applicants/:id" element={<Applicants />} />
          </Route>
          <Route path="" element={<SeekerRoutes />}>
            <Route path="applications" element={<Applications />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
