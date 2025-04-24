import { useEffect, useState, useCallback, memo } from 'react';
import styles from './TracksList.module.css';
import { useApi } from '../../hooks/useApi';
import { trackService } from '../../api/track.service';
import TracksContent from '../track-content/TrackContent';
import CreateTrackForm from '../createTrackForm/CreateTrackForm';
import Modal from '../modalWin/Modal';
import TracksHeader from '../header/Header';
import FilterSidebar from '../trackSearchBar/trackSearchBar';
import { genreService } from '../../api/genre.servise';

const TracksList = () => {
  const { data: genreItems } = useApi(genreService.getGenreList);

  useEffect(() => {
    console.log('genreItems:', genreItems);
  }, [genreItems]);

  const [isModalOpen, setModalOpen] = useState(false);

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
    query: {},
  });

  useEffect(() => {
    execute();
  }, [query, page]);

  const handleBulkDelete = useCallback(
    async (selectedIds) => {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedIds.length} tracks?`,
        )
      ) {
        try {
          execute();
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
    <>
      <div className={styles.header}>
        <TracksHeader onCreateClick={() => setModalOpen(true)} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          data-testid="confirm-dialog"
        >
          <CreateTrackForm
            allGenres={genreItems}
            onSuccess={(track) => console.log('Created!', track)}
          />
        </Modal>
      </div>
      <div className={styles.tracksContainer}>
        <div
          className={styles.sidebar}
          data-testid="filter-sidebar"
          data-loading={loading ? 'true' : 'false'}
        >
          <FilterSidebar
            genres={genreItems}
            query={query}
            setQuery={setQuery}
            changePage={setPage}
            disabled={loading}
            aria-disabled={loading ? 'true' : 'false'}
          />
        </div>

        <div
          className={styles.mainContent}
          data-testid="main-content"
          data-loading={loading ? 'true' : 'false'}
        >
          {loading ? (
            <div
              className={styles['loading-indicator']}
              data-testid="loading-indicator"
              data-loading="true"
            >
              Loading tracks...
            </div>
          ) : (
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
                disabled={loading}
                aria-disabled={loading ? 'true' : 'false'}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TracksList;
