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
      <h4 className={styles.sectionTitle}>Sorting</h4>
      <div className={styles.sortOptions}>
        <select
          className={styles.select}
          value={query?.sortBy || 'title'}
          onChange={handleSortByChange}
          data-testid="sort-select" // Data attribute for testing
        >
          <option value="title">Track Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="genre">Genre</option>
        </select>
        <div className={styles.orderButtons}>
          <button
            className={`${styles.orderButton} ${query?.sortOrder === 'asc' ? styles.active : ''}`}
            onClick={() => handleOrderChange('asc')}
          >
            Ascending
          </button>
          <button
            className={`${styles.orderButton} ${query?.sortOrder === 'desc' ? styles.active : ''}`}
            onClick={() => handleOrderChange('desc')}
          >
            Descending
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortSection;
