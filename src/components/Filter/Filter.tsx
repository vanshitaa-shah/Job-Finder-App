import Styles from "./Filter.module.css";
import Img from "../../assets/logo.png";
import { useState } from "react";

const Filter = ({
  placeholder,
  options,
  onSearch,
  onOptionChange,
}: {
  placeholder: string;
  options: [string, string, string];
  onSearch: (searchValue: string) => void;
  onOptionChange: (selectedOption: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // Call the debounced search function passed as a prop
    onSearch(value);
  };

  const criteriaHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    onOptionChange(value);
  };
  return (
    <>
      <div className={Styles.filterSection}>
        <div className={Styles.leftSection}>
          <input
            type="text"
            placeholder={placeholder}
            className={Styles.searchbar}
            onChange={(e) => searchHandler(e)}
          />
          <img src={Img} className={Styles.searchIcon} width={30} height={30} />
        </div>
        <select
          name="criteria"
          className={Styles.criteria}
          onChange={(e) => criteriaHandler(e)}
        >
          <option value="">Choose Criteria</option>
          <option value={options[0]}>{options[0]}</option>
          <option value={options[1]}>{options[1]}</option>
          <option value={options[2]}>{options[2]}</option>
        </select>
      </div>
    </>
  );
};

export default Filter;
