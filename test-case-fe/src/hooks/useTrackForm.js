import { useState, useCallback } from 'react';
import { trackService } from '../api/track.service'; // Додано відсутній імпорт

export function useTrackForm(initialData = {}, onSubmitCallback) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    artist: initialData.artist || '',
    album: initialData.album || '',
    coverImage: initialData.coverImage || '',
    genres: initialData.genres || [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Назва обовʼязкова';
    if (!formData.artist.trim()) newErrors.artist = 'Виконавець обовʼязковий';
    if (formData.coverImage && !/^https?:\/\/.+/.test(formData.coverImage)) {
      newErrors.coverImage = 'Недійсне посилання на зображення';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.title, formData.artist, formData.coverImage]);

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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validate()) {
        setLoading(true);
        try {
          let savedTrack;
          if (initialData.id) {
            // ✏️ Редагування
            savedTrack = await trackService.updateTrack(
              initialData.id,
              formData,
            );
          } else {
            console.log('formData', formData);
            savedTrack = await trackService.createTrack(formData);
          }

          onSubmitCallback?.(savedTrack);
          return savedTrack;
        } catch (error) {
          setErrors((prev) => ({
            ...prev,
            submit: error.message || 'Не вдалося зберегти трек',
          }));
          throw error;
        } finally {
          setLoading(false);
        }
      }
      return null;
    },
    [formData, validate, onSubmitCallback, initialData.id],
  );

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      artist: '',
      album: '',
      coverImage: '',
      genres: [],
    });
    setErrors({});
  }, []);

  // Повертаємо всі необхідні дані та функції
  return {
    formData,
    loading,
    errors,
    handleChange,
    handleSubmit,
    toggleGenre,
    resetForm,
    setFormData,
  };
}
