import { trackService } from '../../api/track.service';
import { useApi } from '../../hooks/useApi';
import styles from './AudioDelete.module.css';

const AudoiDelete = ({ id, onClose }) => {
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
      <h2>Ви впевнені, що хочете видалити файл?</h2>

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
export default AudoiDelete;
