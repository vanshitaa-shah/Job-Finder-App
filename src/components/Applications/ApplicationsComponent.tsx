import { useCallback, useEffect, useState } from "react";
import JobCard from "../Card/JobCard/JobCard";
import JobDescription from "../JobDescription/JobDescription";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DescriptionType } from "../../Types/type";
import { Job } from "../../Types/type";
import Img from "../../assets/no-data.jpg";
import Filter from "../Filter/Filter";

const ApplicationsComponent = () => {
  const [description, setDescription] = useState<DescriptionType>(
    {} as DescriptionType
  );
  const applications = useSelector(
    (state: RootState) => state.user.currentUser?.applications
  );

  const [showDescription, setShowDescription] = useState(false);
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([] as Job[]);
  const users = useSelector((state: RootState) => state.user.users);
  const email = useSelector(
    (state: RootState) => state.user.currentUser?.email
  );
  const [filteredApplications, setFilteredApplications] = useState<
    Job[] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState("");

  const approvedApplications = appliedJobs.filter((job) => {
    const arr = job.applicants.filter(
      (applicant) =>
        applicant.applicantEmail === email && applicant.status === "approved"
    );
    if (arr[0]) {
      return job;
    }
  });

  const rejectedApplications = appliedJobs.filter((job) => {
    const arr = job.applicants.filter(
      (applicant) =>
        applicant.applicantEmail === email && applicant.status === "rejected"
    );
    if (arr[0]) {
      return job;
    }
  });
  console.log(rejectedApplications);

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => applications?.includes(job.id!));
    setAppliedJobs(filteredJobs);
  }, [jobs]);

  const debouncedSearch = useCallback(
    (searchTerm: string) => {
      const filteredJobs = appliedJobs.filter((job) => {
        const jobTitle = job.jobTitle.toLowerCase();
        const providerUserData = users.find(
          (user) => user.email === job.providerEmail
        );
        const company = providerUserData?.name.toLowerCase()!;
        const lowerCasedSearchTerm = searchTerm.toLowerCase();

        const matchesSearchTerm =
          jobTitle.includes(lowerCasedSearchTerm) ||
          company.includes(lowerCasedSearchTerm);

        const matchesCriteria = selectedCriteria
          ? job.jobType === selectedCriteria
          : true;

        return matchesSearchTerm && matchesCriteria;
      });

      setFilteredApplications(filteredJobs);
    },
    [appliedJobs, users, selectedCriteria]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      debouncedSearch(searchValue);
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchValue, debouncedSearch]);

  const handleSearch = (value: string) => {
    setShowDescription(false);
    setSearchValue(value);
  };

  const criteriaHandler = (value: string) => {
    setShowDescription(false);
    setSelectedCriteria(value);
  };

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      const matchesCriteria = selectedCriteria
        ? job.jobType === selectedCriteria
        : true;
      const isApplied = applications?.includes(job.id!);
      return matchesCriteria && isApplied;
    });

    setAppliedJobs(filteredJobs);
    setFilteredApplications(null);
  }, [jobs, applications, selectedCriteria]);

  if (appliedJobs != undefined)
    return (
      <>
        <Filter
          placeholder="Search By Job title/Company"
          options={["Intern", "Fresher", "Experienced"]}
          onSearch={handleSearch}
          onOptionChange={criteriaHandler}
        />
        <ContainerLayout>
          <div className={Styles.jobsContainer}>
            {!appliedJobs[0] || (searchValue && !filteredApplications?.[0]) ? (
              <img src={Img} className={Styles.noData} />
            ) : (
              (filteredApplications || appliedJobs).map((job) => (
                <JobCard
                  key={job.id}
                  setDescription={setDescription}
                  showDescription={setShowDescription}
                  jobData={job}
                  applied={true}
                />
              ))
            )}
          </div>
          {showDescription && (
            <div className={Styles.descriptionContainer}>
              <JobDescription
                showDescription={setShowDescription}
                descriptionData={description}
              />
            </div>
          )}
        </ContainerLayout>
      </>
    );
  else {
    return <></>;
  }
};

export default ApplicationsComponent;
