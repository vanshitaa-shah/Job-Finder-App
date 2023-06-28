import { useCallback, useEffect, useState } from "react";
import JobCard from "../Card/JobCard/JobCard";
import JobDescription from "../JobDescription/JobDescription";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DescriptionType } from "../../Types/types";
import { Job } from "../../Types/types";
import Img from "../../assets/no-data.jpg";
import Filter from "../Filter/Filter";

const ApplicationsComponent = () => {
  const [description, setDescription] = useState<DescriptionType>(
    {} as DescriptionType
  );
  const applications = useSelector(
    (state: RootState) => state.user.currentUser?.applications
  );
  const [filteredApplications, setFilteredApplications] = useState<
    Job[] | null
  >(null);

  const [showDescription, setShowDescription] = useState(false);
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([] as Job[]);
  const users = useSelector((state: RootState) => state.user.users);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState("");

  // Filtering jobs,which user has applied into.
  useEffect(() => {
    const filteredJobs = jobs.filter((job) => applications?.includes(job.id!));
    setAppliedJobs(filteredJobs);
  }, [jobs]);

  // Debounced search based on company name or job title and criteria
  const debouncedSearch = useCallback(
    (searchTerm: string) => {
      const filteredJobs = appliedJobs.filter((job) => {
        const jobTitle = job.jobTitle.toLowerCase();
        const providerUserData = users.find(
          (user) => user.email === job.providerEmail
        );
        const company = providerUserData?.name.toLowerCase()!;
        const lowerCasedSearchTerm = searchTerm.toLowerCase();

        // Converted everything into lowercase
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

  // calling debounced function and clearing previous one when search value changes
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

  // setting the applied jobs based on criteria
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

          {/* Job Description */}
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
