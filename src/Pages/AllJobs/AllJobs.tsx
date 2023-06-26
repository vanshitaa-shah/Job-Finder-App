import React, { Suspense, useEffect } from "react";
// import Navigation from "../../Layouts/Navigation/Navigation";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, fetchJobsByEmail } from "../../store/jobSlice";
import { fetchUsers } from "../../store/userSlice";
// import AllJobsComponent from "../../components/AllJobs/AllJobsComponent";
const AllJobsComponent = React.lazy(
  () => import("../../components/AllJobs/AllJobsComponent")
);
const Navigation = React.lazy(
  () => import("../../Layouts/Navigation/Navigation")
);

const AllJobs = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const email = useSelector(
    (state: RootState) => state.user.currentUser?.email
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetching the jobs
    if (email) {
      if (role === "seeker") {
        dispatch(fetchJobs());
      } else dispatch(fetchJobsByEmail(email));

      dispatch(fetchUsers());
    }
  }, [email, role]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation component={<AllJobsComponent />} />
      </Suspense>
    </>
  );
};

export default AllJobs;
