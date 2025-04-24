import styles from './Pagination.module.css';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination} data-testid="pagination">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={styles.pageButton}
        data-testid="pagination-prev"
      >
        ← Back
      </button>
      <span className={styles.pageInfo}>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={styles.pageButton}
        data-testid="pagination-next"
      >
        Forward →
      </button>
    </div>
  );
};

export default Pagination;
