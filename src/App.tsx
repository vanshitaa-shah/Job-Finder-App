import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import "./App.css";
import { Route, Routes } from "react-router";
import Signup from "./components/Forms/Signup/Signup";
import Login from "./components/Forms/Login/Login";
import Applicants from "./Pages/Applicants/Applicants";
import AllJobs from "./Pages/AllJobs/AllJobs";
import AddJob from "./Pages/AddJob/AddJob";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-jobs" element={<AllJobs />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/applicants" element={<Applicants />} />
      </Routes>
    </>
  );
};

export default App;
