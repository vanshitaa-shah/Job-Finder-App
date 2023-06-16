import "./App.css";
import { useEffect } from "react";
import { auth } from "./Firebase/firebase";
import { ToastContainer } from "react-toastify";
import { findUserByEmail } from "./Firebase/user.services";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";
import { RootState } from "./store";
import AllRoutes from "./Routes/AllRoutes";
import { fetchUser } from "./store/userSlice";
import { DocumentData } from "firebase/firestore";

const App = () => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.auth.id);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);

      if (user) {
        findUserByEmail(user.email!)
          .then((id) => {
            dispatch(authActions.setId(id));
            dispatch(fetchUser(id) as any);
          })
          .catch(() => {
            return;
          });
      }
    });
  }, []);

  return (
    <>
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
