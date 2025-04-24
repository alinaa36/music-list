import { useState, useCallback } from 'react';
import { trackService } from '../api/track.service';

export function useTrackManager(onSuccessCallback) {
  // Shared state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    coverImage: '',
    genres: [],
  });

  // Form validation
  const validate = useCallback(() => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.artist.trim()) errors.artist = 'Artist is required';
    if (formData.coverImage && !/^https?:\/\/.+/.test(formData.coverImage)) {
      errors.coverImage = 'Invalid image URL';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }, [formData]);

  // Form handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const toggleGenre = useCallback((genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      artist: '',
      album: '',
      coverImage: '',
      genres: [],
    });
    setError(null);
  }, []);

  // CRUD operations
  const createTrack = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      const { isValid, errors } = validate();
      if (!isValid) {
        setError(errors);
        return null;
      }

      setLoading(true);
      try {
        const savedTrack = await trackService.createTrack(formData);
        onSuccessCallback?.('create', savedTrack);
        resetForm();
        return savedTrack;
      } catch (err) {
        setError({ submit: err.message || 'Failed to create track' });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [formData, validate, onSuccessCallback, resetForm],
  );

  const updateTrack = useCallback(
    async (id, data = formData) => {
      if (!id) {
        setError({ submit: 'Track ID is required' });
        return null;
      }

      const { isValid, errors } = validate();
      if (!isValid) {
        setError(errors);
        return null;
      }

      setLoading(true);
      try {
        const updatedTrack = await trackService.updateTrack(id, data);
        onSuccessCallback?.('update', updatedTrack);
        return updatedTrack;
      } catch (err) {
        setError({ submit: err.message || 'Failed to update track' });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [formData, validate, onSuccessCallback],
  );

  const deleteTrack = useCallback(
    async (id) => {
      if (!id) {
        setError({ submit: 'Track ID is required' });
        return false;
      }

      setLoading(true);
      try {
        if (Array.isArray(id)) {
          await trackService.deleteSelectionTracks(id);
        } else {
          await trackService.deleteTrack(id);
        }
        onSuccessCallback?.('delete', id);
        return true;
      } catch (err) {
        setError({ submit: err.message || 'Failed to delete track' });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [onSuccessCallback],
  );

  const deleteAudio = useCallback(
    async (id) => {
      if (!id) {
        setError({ submit: 'Track ID is required' });
        return false;
      }

      setLoading(true);
      try {
        await trackService.deletefile(id);
        onSuccessCallback?.('deleteAudio', id);
        return true;
      } catch (err) {
        setError({ submit: err.message || 'Failed to delete audio file' });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [onSuccessCallback],
  );

  return {
    // Form state and handlers
    formData,
    setFormData,
    handleChange,
    toggleGenre,
    resetForm,

    // CRUD operations
    createTrack,
    updateTrack,
    deleteTrack,
    deleteAudio,

    // Status
    loading,
    error,
    setError,
  };
}
