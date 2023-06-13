import "./App.css";
import { Route, Routes } from "react-router";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import AllJobs from "./Pages/AllJobs/AllJobs";
import AddJob from "./Pages/AddJob/AddJob";
import Applicants from "./Pages/Applicants/Applicants";
import Applications from "./Pages/Applications/Applications";
import Profile from "./Pages/CompleteProfile/Profile";
import EditProfile from "./Pages/Editprofile/EditProfile";
import { useEffect } from "react";
import { auth } from "./Firebase/firebase";
import { ToastContainer } from "react-toastify";
import userServices, { findUserByEmail } from "./Firebase/user.services";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { RootState } from "./store";
import { userActions } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.auth.id);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);

        await findUserByEmail(user.email!)
          .then((id) => dispatch(authActions.setId(id)))
          .then((data) => console.log(data))
          .catch(() => {
            return;
          });
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="complete-profile" element={<Profile />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="edit-job" element={<AddJob type="edit" />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        newestOnTop={false}
        pauseOnHover={false}
        closeOnClick
        draggable
      />
    </>
  );
};

export default App;
