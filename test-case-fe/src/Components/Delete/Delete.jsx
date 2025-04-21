import { useTrackDelete } from '../../hooks/useTrackDelete';
import styles from './Delete.module.css';

const Delete = ({ id, onClose }) => {
  const { deleteTrack, deleteLoading, deleteError } = useTrackDelete(() => {
    console.log('Трек видалено');
    onClose();
  });

  return (
    <div className={styles.deleteModal}>
      <h2>Ви впевнені, що хочете видалити трек?</h2>

      {deleteError && <div className={styles.errorMessage}>{deleteError}</div>}

      <div className={styles.modalButtons}>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => deleteTrack(id)}
          disabled={deleteLoading}
        >
          {deleteLoading ? 'Видалення...' : 'Так, видалити'}
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
          disabled={deleteLoading}
        >
          Скасувати
        </button>
      </div>
    </div>
  );
};
export default Delete;
