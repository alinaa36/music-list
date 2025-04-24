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

  useEffect(() => {
    if (query && query.length) {
      setSelectedItems(query);
    } else {
      setSelectedItems([]);
    }
  }, [query]);

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

  return (
    <div className={styles.filterSection}>
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
        {items.map((item, index) => (
          <label key={index} className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            <span className={styles.checkboxLabel}>{item}</span>
            <span className={styles.countBadge}>{item.count}</span>
          </label>
        ))}
      </div>
      <button className={styles.showMoreButton}>Показати більше</button>
    </div>
  );
};

export default CheckboxFilterSection;
