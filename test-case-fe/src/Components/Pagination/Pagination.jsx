// components/Pagination/Pagination.jsx
import styles from './Pagination.module.css';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={styles.pageButton}
      >
        ← Назад
      </button>
      <span className={styles.pageInfo}>
        Сторінка {page} з {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={styles.pageButton}
      >
        Вперед →
      </button>
    </div>
  );
};

export default Pagination;
