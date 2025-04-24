import React from 'react';
import styles from './trackSearchBar.module.css';
import SearchSection from '../search-section/SearchSection';
import SortSection from '../sort-section/SortSection';
import CheckboxFilterSection from '../checkbox-filter-section/CheckboxFilterSection';
import { genreService } from '../../api/genre.servise';
import { useApi } from '../../hooks/useApi';
import { useEffect } from 'react';

const FilterSidebar = ({ query, setQuery, changePage }) => {
  const handleCheckboxChange = (key, selectedValues) => {
    setQuery((prev) => ({
      ...prev,
      [key]: selectedValues,
    }));
    changePage(1); // Переходимо на першу сторінку при зміні фільтрів
  };

  const { data: genreItems, execute } = useApi(genreService.getGenreList);

  useEffect(() => {
    console.log('genreItems:', genreItems);
  }, [genreItems]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        і<h3>Фільтри</h3>
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
        filterKey="genre"
        placeholder="Пошук жанру"
        items={Array.isArray(genreItems) ? genreItems : []}
        query={query.genres || []}
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
