import WelcomePage from "./components/WelcomePage/WelcomePage";
import "./App.css";
import { Route, Routes } from "react-router";
import Signup from "./components/Forms/Signup/Signup";
import Login from "./components/Forms/Login/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/provider/signup" element={<Signup />} />
        <Route path="/seeker/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
