import { useState, useCallback } from 'react';
import { trackService } from '../api/track.service';

export function useTrackDelete(onDeleteSuccess) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteTrack = useCallback(
    async (id) => {
      if (!id) {
        setDeleteError('ID треку не вказаний');
        return false;
      }

      setDeleteLoading(true);
      setDeleteError(null);

      try {
        if (Array.isArray(id)) {
          console.log('id', id);
          await trackService.deleteSelectionTracks(id);
        } else await trackService.deleteTrack(id);
        console.log('Трек видалено');

        if (onDeleteSuccess) {
          onDeleteSuccess();
        }

        return true;
      } catch (error) {
        const errorMessage = error.message || 'Помилка при видаленні треку';
        console.error('Помилка при видаленні:', error);
        setDeleteError(errorMessage);
        return false;
      } finally {
        setDeleteLoading(false);
      }
    },
    [onDeleteSuccess],
  );

  const resetDeleteState = useCallback(() => {
    setDeleteError(null);
  }, []);

  return {
    deleteTrack,
    deleteLoading,
    deleteError,
    resetDeleteState,
  };
}
