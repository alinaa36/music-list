import React, { useEffect } from 'react';
import styles from './trackSearchBar.module.css';
import SearchSection from '../search-section/SearchSection';
import SortSection from '../sort-section/SortSection';
import CheckboxFilterSection from '../checkbox-filter-section/CheckboxFilterSection';
import { genreService } from '../../api/genre.servise';
import { useApi } from '../../hooks/useApi';

const FilterSidebar = ({ query, setQuery, changePage }) => {
  // Fetch genre list
  const { data: genreItems, execute } = useApi(genreService.getGenreList);

  useEffect(() => {
    execute(); // Execute API call when component mounts
  }, []);

  useEffect(() => {
    console.log('genreItems:', genreItems);
  }, [genreItems]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Фільтри</h3>
        <button
          className={styles.resetButton}
          onClick={() => {
            setQuery({});
            changePage(1);
          }}
        >
          Скинути все
        </button>
      </div>

      <SearchSection
        query={query}
        setQuery={setQuery}
        changePage={changePage}
      />
      <SortSection query={query} setQuery={setQuery} changePage={changePage} />

      <CheckboxFilterSection
        title="Жанри"
        filterKey="genre" // This should match the key in your query object
        placeholder="Пошук жанру"
        items={Array.isArray(genreItems) ? genreItems : []}
        query={query} // Pass the whole query object, not just query.genres
        setQuery={setQuery}
        changePage={changePage}
      />

      <div className={styles.filterActions}>
        <button className={styles.applyButton}>Застосувати фільтри</button>
        <button className={styles.saveButton}>Зберегти набір фільтрів</button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
