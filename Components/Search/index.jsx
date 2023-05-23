import "./search.css"
import React, { useState } from "react";

const SearchInput = ({ countries }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = countries.allCountries.filter((country) => {
      if (
        String(country.name.common)
          .toLowerCase()
          .startsWith(term.toLowerCase())
      ) {
        return country;
      }
    });
    setSearchResults(results);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      const cca3 = searchResults[0]?.cca3;
      if (cca3) {
        window.location.href = `/about/${cca3}`;
      }
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Write a Country"
        list="countries"
      />
      <datalist id="countries">
        {searchResults.map((item) => (
          <option
            key={item.name.common}
            value={item.name.common}
          ></option>
        ))}
      </datalist>
    </div>
  );
};

export default SearchInput;
