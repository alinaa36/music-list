// Components/TracksList/TracksList.jsx
import { useEffect, useState, useCallback, memo } from 'react';
import styles from './TracksList.module.css'; // Adjust the path if necessary
import TrackCard from '../TrackCard/TrackCard';
import { useTrackDelete } from '../../hooks/useTrackDelete';
import TrackSelectionManager from '../trackSelection/TrackSelectoin';
import { useApi } from '../../hooks/useApi';
import { trackService } from '../../api/track.service';
import Pagination from '../Pagination/Pagination';
import FilterSidebar from '../trackSearchBar/trackSearchBar';
import TracksContent from '../track-content/TrackContent';
import CreateTrackForm from '../createTrackForm/CreateTrackForm';
import Modal from '../modalWin/Modal';
import { genreService } from '../../api/genre.servise';

const TracksList = () => {
  const { data: genreItems } = useApi(genreService.getGenreList);

  useEffect(() => {
    console.log('genreItems:', genreItems);
  }, [genreItems]);
  const [isModalOpen, setModalOpen] = useState(false);
  // Налаштування хука API
  const {
    data: tracks,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    query,
    setQuery,
    execute,
  } = useApi(trackService.getTrackList, {
    page: 1,
    limit: 3,
    query: {}, // Початкові фільтри
  });

  // Запит при зміні query або сторінки
  useEffect(() => {
    execute();
  }, [query, page]); // Додаємо query та page в залежності

  // Обробники для виконання дій
  const handleBulkDelete = useCallback(
    async (selectedIds) => {
      if (
        window.confirm(
          `Ви впевнені, що хочете видалити ${selectedIds.length} треків?`,
        )
      ) {
        try {
          // Тут логіка видалення
          execute(); // Оновлюємо дані після видалення
        } catch (error) {
          console.error('Error deleting tracks:', error);
        }
      }
    },
    [execute],
  );

  const handleAddToPlaylist = useCallback((selectedIds) => {
    console.log('Adding to playlist:', selectedIds);
  }, []);

  return (
    <div className={styles.tracksContainer}>
      <div className={styles.sidebar}>
        <FilterSidebar
          genres={genreItems}
          query={query}
          setQuery={setQuery}
          changePage={setPage}
        />
      </div>

      <div className={styles.mainContent}>
        <button onClick={() => setModalOpen(true)}>Створити трек</button>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <CreateTrackForm
            allGenres={genreItems}
            onSuccess={(track) => console.log('Created!', track)}
          />
        </Modal>

        <div>
          <TracksContent
            allGenres={genreItems}
            tracks={tracks}
            loading={loading}
            error={error}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            onBulkDelete={handleBulkDelete}
            onAddToPlaylist={handleAddToPlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default TracksList;
