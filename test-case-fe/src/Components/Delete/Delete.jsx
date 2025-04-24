import { trackService } from '../../api/track.service';
import { useApi } from '../../hooks/useApi';
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
    <div>
      <h2>Are you sure you want to delete this track?</h2>

      <div>
        <button
          onClick={() => handleDelete(id)}
          data-testid={`delete-track-${id}`}
        >
          Yes, delete
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Delete;
