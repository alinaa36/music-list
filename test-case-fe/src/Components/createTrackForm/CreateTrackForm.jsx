import { useGenre } from '../../hooks/useGenre';
import styles from './CreateTrackForm.module.css';
import { useTrackForm } from '../../hooks/useTrackForm';

function CreateTrackForm({ initialData = {}, onSuccess }) {
  // Отримуємо жанри
  const { genres: allGenres = [] } = useGenre();

  // Використовуємо хук для форми
  const {
    formData,
    loading,
    errors,
    handleChange,
    handleSubmit,
    toggleGenre,
    resetForm,
  } = useTrackForm(initialData, (savedTrack) => {
    console.log('Трек збережено:', savedTrack);
    resetForm();
    onSuccess?.(savedTrack); // виклик колбеку ззовні (наприклад, для закриття модального вікна)
  });

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
        <div className={styles['error-text']}>{errors.coveImage}</div>
      )}

      <img
        src={formData.coverImage || '/default-cover.png'}
        alt="Обкладинка"
        className={styles['cover-img']}
      />

      <div className={styles['available-genres']}>
        <h3 className="w-full">Доступні жанри:</h3>
        {allGenres.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => toggleGenre(genre)}
            className={`${styles['genre-btn']} ${
              formData.genres.includes(genre)
                ? styles['selected-genre-btn']
                : ''
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Рядок для обраних жанрів */}
      {formData.genres.length > 0 && (
        <div className={styles['selected-genres']}>
          <h3 className="w-full">Обрані жанри:</h3>
          {formData.genres.map((genre) => (
            <span key={genre} className={styles['selected-genre']}>
              {genre}{' '}
              <button
                type="button"
                onClick={() => toggleGenre(genre)}
                className={styles['remove-genre-btn']}
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Зберігаємо...' : 'Зберегти'}
      </button>

      {errors.submit && (
        <div className={styles['error-text']}>{errors.submit}</div>
      )}
    </form>
  );
}

export default CreateTrackForm;
