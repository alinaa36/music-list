import React, { useState, useEffect } from 'react';
import styles from '../trackSearchBar/trackSearchBar.module.css';

const CheckboxFilterSection = ({
  filterKey,
  query,
  setQuery,
  changePage,
  title,
  placeholder,
  items,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    if (query && query[filterKey] && Array.isArray(query[filterKey])) {
      setSelectedItems(query[filterKey]);
    } else {
      setSelectedItems([]);
    }
  }, [query, filterKey]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (label) => {
    let updated;

    if (selectedItems.includes(label)) {
      updated = selectedItems.filter((item) => item !== label);
    } else {
      updated = [...selectedItems, label];
    }

    setSelectedItems(updated);

    setQuery((prev) => ({
      ...prev,
      [filterKey]: updated,
    }));

    changePage(1);
  };

  const showMoreItems = () => {
    setVisibleItems((prev) => prev + 5);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.filterSection} data-testid="filter-genre">
      <h4 className={styles.sectionTitle}>{title}</h4>
      <div className={styles.filterSearch}>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.filterSearchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.checkboxList}>
        {filteredItems.slice(0, visibleItems).map((item, index) => (
          <label key={index} className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            <span className={styles.checkboxLabel}>{item}</span>
          </label>
        ))}
      </div>
      {visibleItems < filteredItems.length && (
        <button className={styles.showMoreButton} onClick={showMoreItems}>
          Show More
        </button>
      )}
    </div>
  );
};

export default CheckboxFilterSection;
