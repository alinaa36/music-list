import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { trackService } from '../../api/track.service';
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
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.artist.trim()) newErrors.artist = 'Artist is required';
    if (formData.coverImage && !formData.coverImage.startsWith('http'))
      newErrors.coverImage = 'Invalid image URL';
    if (formData.genres.length === 0)
      newErrors.genres = 'At least one genre is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = isEditMode ? { ...formData } : { ...formData };

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
      setErrors({ submit: 'Failed to save the track' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles['form-container']}
      data-testid="track-form"
    >
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Track Title"
        className={styles['input-field']}
        data-testid="input-title"
      />
      {errors.title && (
        <div className={styles['error-text']} data-testid="error-title">
          {errors.title}
        </div>
      )}

      <input
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        placeholder="Artist"
        className={styles['input-field']}
        data-testid="input-artist"
      />
      {errors.artist && (
        <div className={styles['error-text']} data-testid="error-artist">
          {errors.artist}
        </div>
      )}

      <input
        name="album"
        value={formData.album}
        onChange={handleChange}
        placeholder="Album (optional)"
        className={styles['input-field']}
        data-testid="input-album"
      />

      <input
        name="coverImage"
        value={formData.coverImage}
        onChange={handleChange}
        placeholder="Image URL"
        className={styles['input-field']}
        data-testid="input-cover-image"
      />
      {errors.coverImage && (
        <div className={styles['error-text']}>{errors.coverImage}</div>
      )}

      <img
        src={formData.coverImage || '/default-cover.png'}
        alt="Cover"
        className={styles['cover-img']}
      />

      <div className={styles['available-genres']} data-testid="genre-selector">
        <h3 className="w-full">Genres:</h3>
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
      {errors.genres && (
        <div className={styles['error-text']} data-testid="error-genres">
          {errors.genres}
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={apiHook.loading}
        data-testid="submit-button"
      >
        {apiHook.loading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
      </button>

      {errors.submit && (
        <div className={styles['error-text']}>{errors.submit}</div>
      )}
      {apiHook.error && (
        <div className={styles['error-text']}>
          Error: {apiHook.error.message}
        </div>
      )}
    </form>
  );
}

export default CreateTrackForm;
