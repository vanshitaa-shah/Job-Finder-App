import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ApplicantCard from "../../components/Card/ApplicantCard/ApplicantCard";
import jobServices from "../../Firebase/job.services";
import ContainerLayout from "../../Layouts/Container/ContainerLayout";
import Styles from "../../Pages/Applicants/Applicants.module.css";
import MainStyles from "../../Layouts/Navigation/Navigation.module.css";
import Img from "../../assets/no-data.jpg";
import { Applicant } from "../../Types/types";
import { setLoading } from "../../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../../components/Filter/Filter";

const ApplicantsComponent = () => {
  const dispatch = useDispatch();
  const jobId = useParams().id!;
  const [applicants, setApplicants] = useState<Applicant[]>([] as Applicant[]);
  const [filteredApplicants, setFilteredApplicants] = useState<
    Applicant[] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState("");

  // getting specific job in which the applicants belongs
  const getJobData = async () => {
    dispatch(setLoading(true));
    const jobData = (await jobServices.getJob(jobId)).data();
    dispatch(setLoading(false));
    setApplicants(jobData?.applicants);
  };

  useEffect(() => {
    getJobData();
  }, [jobId]);

  // Debounced search based on applicant's email and criteria
  const debouncedSearch = (searchTerm: string) => {
    if (applicants[0]) {
      const filteredApplicants = applicants.filter((applicant) => {
        const applicantName = applicant.applicantEmail;
        const lowerCasedSearchTerm = searchTerm.toLowerCase();

        const matchesSearchTerm = applicantName.includes(lowerCasedSearchTerm);

        const matchesCriteria = selectedCriteria
          ? applicant.status.toLowerCase() === selectedCriteria.toLowerCase()
          : true;

        return matchesSearchTerm && matchesCriteria;
      });

      setFilteredApplicants(filteredApplicants);
    }
  };

  // calling debounced function and clearing previous one when search value changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      debouncedSearch(searchValue);
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const criteriaHandler = (value: string) => {
    setSelectedCriteria(value);
  };

  // Filtering applicants based on criteria
  useEffect(() => {
    const filteredApplicantsArray = applicants.filter((applicant) => {
      const matchesCriteria = selectedCriteria
        ? applicant.status.toLowerCase() === selectedCriteria.toLowerCase()
        : true;
      return matchesCriteria;
    });

    setFilteredApplicants(filteredApplicantsArray);
  }, [applicants, selectedCriteria]);

  return (
    <>
      <Filter
        placeholder="Search by Applicant's Email"
        options={["Pending", "Approved", "Rejected"]}
        onSearch={handleSearch}
        onOptionChange={criteriaHandler}
      />
      <ContainerLayout>
        <div className={Styles.applicantsContainer}>
          {!applicants[0] || (searchValue && !filteredApplicants?.[0]) ? (
            <img src={Img} className={MainStyles.noData} />
          ) : (
            (filteredApplicants || applicants).map((applicant, idx) => {
              return (
                <ApplicantCard
                  key={idx}
                  applicant={applicant}
                  allApplicants={applicants}
                  setApplicants={setApplicants}
                />
              );
            })
          )}
        </div>
      </ContainerLayout>
    </>
  );
};

export default ApplicantsComponent;
