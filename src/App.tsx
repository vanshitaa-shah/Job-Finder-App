import "./App.css";
import { useEffect } from "react";
import { auth } from "./Firebase/firebase";
import { ToastContainer } from "react-toastify";
import { findUserByEmail } from "./utils/functions/firebaseUtility";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";
import { AppDispatch, RootState } from "./store";
import AllRoutes from "./Routes/AllRoutes";
import { fetchUser, fetchUsers } from "./store/userSlice";
import Loader from "./components/Loader/Loader";
import { fetchJobs, fetchJobsByEmail } from "./store/jobSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const role = useSelector((state: RootState) => state.auth.role);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    //callback that gets called whenever the page's authentication state changes
    auth.onAuthStateChanged((user) => {
      if (user) {
        findUserByEmail(user.email!)
          .then((id) => {
            if (id) {
              dispatch(authActions.setId(id));
              dispatch(fetchUser(id));
              dispatch(fetchUsers());
            }
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
      {isLoading && <Loader />}
      {/* Routes */}
      <AllRoutes />

      {/*container for Toast messages */}
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
