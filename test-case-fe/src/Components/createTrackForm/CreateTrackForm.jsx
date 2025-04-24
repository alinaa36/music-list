import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { trackService } from '../../api/track.service';
import { useGenre } from '../../hooks/useGenre';
import styles from './CreateTrackForm.module.css';

function CreateTrackForm({ allGenres, initialData = {}, onSuccess }) {
  const isEditMode = Boolean(initialData?.id);
  const genres = allGenres || [];

  const [formData, setFormData] = useState(() => ({
    title: initialData.title || '',
    artist: initialData.artist || '',
    album: initialData.album || '',
    coverImage: initialData.coverImage || '',
    genres: initialData.genres || [],
  }));

  const apiHook = useApi(
    isEditMode ? trackService.updateTrack : trackService.createTrack,
    { autoExecute: false },
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleGenre = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Назва обовʼязкова';
    if (!formData.artist.trim()) newErrors.artist = 'Виконавець обовʼязковий';
    if (formData.coverImage && !formData.coverImage.startsWith('http'))
      newErrors.coverImage = 'Некоректне посилання на зображення';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = isEditMode
      ? { ...formData } // Без id в body для PUT
      : { ...formData };

    const requestOptions = isEditMode
      ? {
          method: 'PUT',
          body: payload,
          id: initialData.id,
        }
      : {
          method: 'POST',
          body: payload,
        };

    const response = await apiHook.execute(requestOptions);
    if (response) {
      onSuccess?.(response);
      if (!isEditMode) {
        setFormData({
          title: '',
          artist: '',
          album: '',
          coverImage: '',
          genres: [],
        });
      }
    } else {
      setErrors({ submit: 'Не вдалося зберегти трек' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['form-container']}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Назва треку"
        className={styles['input-field']}
      />
      {errors.title && (
        <div className={styles['error-text']}>{errors.title}</div>
      )}

      <input
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        placeholder="Виконавець"
        className={styles['input-field']}
      />
      {errors.artist && (
        <div className={styles['error-text']}>{errors.artist}</div>
      )}

      <input
        name="album"
        value={formData.album}
        onChange={handleChange}
        placeholder="Альбом (необов'язково)"
        className={styles['input-field']}
      />

      <input
        name="coverImage"
        value={formData.coverImage}
        onChange={handleChange}
        placeholder="URL обкладинки"
        className={styles['input-field']}
      />
      {errors.coverImage && (
        <div className={styles['error-text']}>{errors.coverImage}</div>
      )}

      <img
        src={formData.coverImage || '/default-cover.png'}
        alt="Обкладинка"
        className={styles['cover-img']}
      />

      <div className={styles['available-genres']}>
        <h3 className="w-full">Жанри:</h3>
        {genres.map((genre) => {
          const isSelected = formData.genres.includes(genre);
          return (
            <button
              key={genre}
              type="button"
              onClick={() => toggleGenre(genre)}
              className={`${styles['genre-btn']} ${
                isSelected ? styles['selected-genre-btn'] : ''
              }`}
            >
              {genre}
              {isSelected && <span className={styles['remove-mark']}> ×</span>}
            </button>
          );
        })}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={apiHook.loading}
      >
        {apiHook.loading
          ? 'Зберігаємо...'
          : isEditMode
            ? 'Оновити'
            : 'Створити'}
      </button>

      {errors.submit && (
        <div className={styles['error-text']}>{errors.submit}</div>
      )}
      {apiHook.error && (
        <div className={styles['error-text']}>
          Сталася помилка: {apiHook.error.message}
        </div>
      )}
    </form>
  );
}

export default CreateTrackForm;
