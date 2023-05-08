import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchInput = ({ countries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = Object.values(countries).filter((country) => {
      console.log(country)
      country.name.common.toLowerCase().includes(term.toLowerCase())
    }
    );
    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Введите название страны"
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.name.common}>
            <Link to={`/about/${result.name.common}`}>{result.name.common}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;