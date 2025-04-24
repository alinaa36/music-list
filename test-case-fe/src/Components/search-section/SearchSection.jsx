// Components/search-section/SearchSection.jsx
import React, { useState, useEffect, useCallback } from 'react';
import styles from '../trackSearchBar/trackSearchBar.module.css';
import debounce from 'lodash/debounce';

const SearchSection = ({ query, setQuery, changePage }) => {
  const [searchValue, setSearchValue] = useState(query?.search || '');

  const debouncedSearch = useCallback(
    debounce((value) => {
      setQuery((prev) => ({
        ...prev,
        search: value,
      }));
      changePage(1);
    }, 1000),
    [setQuery, changePage],
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (query?.search !== searchValue) {
      setSearchValue(query?.search || '');
    }
  }, [query?.search]);

  return (
    <div className={styles.filterSection}>
      <h4 className={styles.sectionTitle}>Search</h4>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for tracks..."
          className={styles.searchInput}
          value={searchValue}
          onChange={handleInputChange}
          data-testid="search-input"
        />
      </div>
      <p className={styles.searchHint}>
        Search with debounce by title, artist, and album
      </p>
    </div>
  );
};

export default SearchSection;
