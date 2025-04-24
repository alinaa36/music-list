import styles from '../trackSearchBar/trackSearchBar.module.css';
const SortSection = ({ query, setQuery, changePage }) => {
  const handleSortByChange = (e) => {
    const value = e.target.value;
    setQuery((prev) => ({
      ...prev,
      sort: value,
    }));
    changePage(1);
  };

  const handleOrderChange = (order) => {
    setQuery((prev) => ({
      ...prev,
      order: order,
    }));
    changePage(1);
  };

  return (
    <div className={styles.filterSection}>
      <h4 className={styles.sectionTitle}>Сортування</h4>
      <div className={styles.sortOptions}>
        <select
          className={styles.select}
          value={query?.sortBy || 'title'}
          onChange={handleSortByChange}
        >
          <option value="title">Назва треку</option>
          <option value="artist">Виконавець</option>
          <option value="album">Альбом</option>
          <option value="genre">Жанр</option>
        </select>
        <div className={styles.orderButtons}>
          <button
            className={`${styles.orderButton} ${query?.sortOrder === 'asc' ? styles.active : ''}`}
            onClick={() => handleOrderChange('asc')}
          >
            За зростанням
          </button>
          <button
            className={`${styles.orderButton} ${query?.sortOrder === 'desc' ? styles.active : ''}`}
            onClick={() => handleOrderChange('desc')}
          >
            За спаданням
          </button>
        </div>
      </div>
    </div>
  );
};
export default SortSection;
