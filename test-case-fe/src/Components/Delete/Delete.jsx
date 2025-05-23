import { trackService } from '../../api/track.service';
import { useApi } from '../../hooks/useApi';
import { useTrackDelete } from '../../hooks/useTrackDelete';
import styles from './Delete.module.css';

const Delete = ({ id, onClose }) => {
  console.log('Delete component rendered with id:', id);
  const handleDelete = async (id) => {
    await apiHook.execute({
      method: 'DELETE',
      id: id,
    });
  };
  const apiHook = useApi(trackService.deleteTrack, { autoExecute: false });

  return (
    <div className={styles.deleteModal}>
      <h2>Ви впевнені, що хочете видалити трек?</h2>

      <div className={styles.modalButtons}>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => handleDelete(id)}
        >
          {'Так, видалити'}
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
          Скасувати
        </button>
      </div>
    </div>
  );
};
export default Delete;
