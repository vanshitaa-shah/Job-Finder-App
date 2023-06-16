import FormLayout from "../../Layouts/Form/FormLayout";
import SignupForm from "../../components/Forms/Signup/SignupForm";
import Navbar from "../../components/Navbar/Navbar";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { error } from "../../utils/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchUser } from "../../store/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.auth.id);
  const role = useSelector((state: RootState) => state.auth.role)!;
  useEffect(() => {
    if (role === "") {
      error("Choose your role!");
      navigate("/");
    }
    // dispatch(fetchUser(id) as any);
  }, []);

  return (
    <>
      <Navbar />
      <FormLayout>
        <Typography variant="h5">Signup</Typography>
        <SignupForm />
        <p>
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </FormLayout>
    </>
  );
};

export default Signup;
