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

  const handleSearchClick = () => {
    setQuery((prev) => ({
      ...prev,
      search: searchValue,
    }));
    changePage(1);
  };

  useEffect(() => {
    if (query?.search !== searchValue) {
      setSearchValue(query?.search || '');
    }
  }, [query?.search]);

  return (
    <div className={styles.filterSection}>
      <h4 className={styles.sectionTitle}>Пошук</h4>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Пошук треків..."
          className={styles.searchInput}
          value={searchValue}
          onChange={handleInputChange}
        />
        <button className={styles.searchButton} onClick={handleSearchClick}>
          <span className={styles.searchIcon}>🔍</span>
        </button>
      </div>
      <p className={styles.searchHint}>
        Пошук з debounce за назвою, виконавцем та альбомом
      </p>
    </div>
  );
};

export default SearchSection;
