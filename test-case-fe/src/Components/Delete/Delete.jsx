import { trackService } from '../../api/track.service';
import { useApi } from '../../hooks/useApi';
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
      <h2>Are you sure you want to delete this track?</h2>

      <div className={styles.modalButtons}>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => handleDelete(id)}
          data-testid={`delete-track-${id}`}
        >
          Yes, delete
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Delete;
