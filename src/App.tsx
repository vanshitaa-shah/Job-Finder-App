import "./App.css";
import { useEffect } from "react";
import { auth } from "./Firebase/firebase";
import { ToastContainer } from "react-toastify";
import { findUserByEmail } from "./Firebase/user.services";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";
import { AppDispatch, RootState } from "./store";
import AllRoutes from "./Routes/AllRoutes";
import { fetchUser, fetchUsers } from "./store/userSlice";
import Loader from "./components/Loader/Loader";
import { fetchJobs, fetchJobsByEmail } from "./store/jobSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const role = useSelector((state: RootState) => state.auth.role);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);

      if (user) {
        findUserByEmail(user.email!)
          .then((id) => {
            dispatch(authActions.setId(id));
            dispatch(fetchUser(id));
            dispatch(fetchUsers());
            if (role === "seeker") dispatch(fetchJobs());
            else dispatch(fetchJobsByEmail(user.email));
          })
          .catch(() => {
            return;
          });
      }
    });
  }, []);

  return (
    <>
      {isLoading && !currentUser && <Loader />}
      <AllRoutes />

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
