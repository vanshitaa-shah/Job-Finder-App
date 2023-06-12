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

const App = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user?.email);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complete-profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/all-jobs" element={<AllJobs />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/edit-job" element={<AddJob type="edit" />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/applications" element={<Applications />} />
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
