import { useState, useCallback } from 'react';
import { trackService } from '../api/track.service';

export function useAudioDelete(onDeleteSuccess) {
  const [audioDeleteLoading, setAudioDeleteLoading] = useState(false);
  const [audioDeleteError, setAudioDeleteError] = useState(null);

  const deleteAudio = useCallback(
    async (id) => {
      if (!id) {
        setAudioDeleteError('ID треку не вказаний');
        return false;
      }

      setAudioDeleteLoading(true);
      setAudioDeleteError(null);

      try {
        await trackService.deletefile(id);
        console.log('Аудіофайл видалено');

        if (onDeleteSuccess) {
          onDeleteSuccess();
        }

        return true;
      } catch (error) {
        const errorMessage =
          error.message || 'Помилка при видаленні аудіофайлу';
        console.error('Помилка при видаленні аудіо:', error);
        setAudioDeleteError(errorMessage);
        return false;
      } finally {
        setAudioDeleteLoading(false);
      }
    },
    [onDeleteSuccess],
  );

  return {
    deleteAudio,
    audioDeleteLoading,
    audioDeleteError,
  };
}
