import { useCallback, useEffect, useState } from "react";
import JobCard from "../../components/Card/JobCard/JobCard";
import JobDescription from "../../components/JobDescription/JobDescription";
import Styles from "../../Layouts/Navigation/Navigation.module.css";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Job } from "../../Types/types";
import { DescriptionType } from "../../Types/types";
import Img from "../../assets/no-data.jpg";
import Filter from "../../components/Filter/Filter";

const AllJobsComponent = () => {
  const jobs = useSelector((state: RootState) => state.job.jobs);
  const users = useSelector((state: RootState) => state.user.users);
  const [showDescription, setShowDescription] = useState(false);
  const [applicableJobs, setApplicableJobs] = useState<Job[]>([] as Job[]);
  const [filteredJobs, setFilteredJobs] = useState<Job[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [description, setDescription] = useState<DescriptionType>(
    {} as DescriptionType
  );
  const applications = useSelector(
    (state: RootState) => state.user.currentUser?.applications
  );

  // Debounced search based on company name or job title and criteria
  const debouncedSearch = useCallback(
    (searchTerm: string) => {
      const filteredJobs = applicableJobs.filter((job) => {
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

      setFilteredJobs(filteredJobs);
    },
    [applicableJobs, users, selectedCriteria]
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

  // Filtering jobs based on criteria
  useEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      const matchesCriteria = selectedCriteria
        ? job.jobType === selectedCriteria
        : true;
      const isNotApplied = !applications?.includes(job.id!);
      return matchesCriteria && isNotApplied;
    });

    setApplicableJobs(filteredJobs);
    setFilteredJobs(null);
  }, [jobs, applications, selectedCriteria]);

  if (users[0]) {
    return (
      <>
        <Filter
          placeholder="Search by Job title/Company"
          options={["Intern", "Fresher", "Experienced"]}
          onSearch={handleSearch}
          onOptionChange={criteriaHandler}
        />
        <ContainerLayout>
          <div className={Styles.jobsContainer}>
            {!applicableJobs[0] || (searchValue && !filteredJobs?.[0]) ? (
              <img src={Img} className={Styles.noData} alt="No data" />
            ) : (
              (filteredJobs || applicableJobs).map((job) => (
                <JobCard
                  key={job.id}
                  setDescription={setDescription}
                  showDescription={setShowDescription}
                  jobData={job}
                  applicableJobs={applicableJobs}
                  setApplicableJobs={setApplicableJobs!}
                />
              ))
            )}
          </div>

          {/* Description */}
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
  } else {
    return <></>;
  }
};

export default AllJobsComponent;
