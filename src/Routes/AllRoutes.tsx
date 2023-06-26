import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
const AddJob = React.lazy(() => import("../Pages/AddJob/AddJob"));
const AllJobs = React.lazy(() => import("../Pages/AllJobs/AllJobs"));
const Applicants = React.lazy(() => import("../Pages/Applicants/Applicants"));
const Applications = React.lazy(
  () => import("../Pages/Applications/Applications")
);
const Profile = React.lazy(() => import("../Pages/CompleteProfile/Profile"));
const EditProfile = React.lazy(
  () => import("../Pages/Editprofile/EditProfile")
);
const ErrorPage = React.lazy(() => import("../Pages/ErrorPage/ErrorPage"));
const Login = React.lazy(() => import("../Pages/Login/Login"));
const Signup = React.lazy(() => import("../Pages/Signup/Signup"));
const WelcomePage = React.lazy(
  () => import("../Pages/WelcomePage/WelcomePage")
);
import { RootState } from "../store";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";
import ProviderRoutes from "./ProviderRoutes";
import SeekerRoutes from "./SeekerRoutes";
import Loader from "../components/Loader/Loader";

const AllRoutes = () => {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* UnAuthenticated Routes */}
          <Route path="" element={<UnAuthenticatedRoutes />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Authenticated Routes */}
          <Route path="" element={<AuthenticatedRoutes />}>
            <Route path="complete-profile" element={<Profile />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="edit-profile" element={<EditProfile />} />

            {/* Provider Users's routes */}
            <Route path="" element={<ProviderRoutes />}>
              <Route path="add-job" element={<AddJob />} />
              <Route path="edit-job/:id" element={<AddJob type="edit" />} />
              <Route path="applicants/:id" element={<Applicants />} />
            </Route>

            {/* Seeker Users's routes */}
            <Route path="" element={<SeekerRoutes />}>
              <Route path="applications" element={<Applications />} />
            </Route>
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AllRoutes;
