import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import "./App.css";
import { Route, Routes } from "react-router";
import Signup from "./components/Forms/Signup/Signup";
import Login from "./components/Forms/Login/Login";
import Applicants from "./Pages/Applicants/Applicants";
import AllJobs from "./Pages/AllJobs/AllJobs";
import AddJob from "./Pages/AddJob/AddJob";
import Applications from "./Pages/Applications/Applications";
import { Suspense, useEffect } from "react";
import { auth } from "./Firebase/firebase";
import Profile from "./Pages/CompleteProfile/Profile";
import EditProfile from "./Pages/Editprofile/EditProfile";

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
    </>
  );
};

export default App;
