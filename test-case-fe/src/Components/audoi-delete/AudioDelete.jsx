import { trackService } from '../../api/track.service';
import { useApi } from '../../hooks/useApi';
import styles from './AudioDelete.module.css';

const AudioDelete = ({ id, onClose }) => {
  console.log('Delete component rendered with id:', id);

  const handleDelete = async (id) => {
    await apiHook.execute({
      method: 'DELETE',
      id: id,
    });
  };

  const apiHook = useApi(trackService.deletefile, { autoExecute: false });

  return (
    <div className={styles.deleteModal}>
      <h2>Are you sure you want to delete this file?</h2>

      <div className={styles.modalButtons}>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => handleDelete(id)}
        >
          {'Yes, delete'}
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AudioDelete;
