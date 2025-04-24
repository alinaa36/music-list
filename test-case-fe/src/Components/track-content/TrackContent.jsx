import styles from '../TracksList/TracksList.module.css';
import { useTrackDelete } from '../../hooks/useTrackDelete';
import TrackSelectionManager from '../trackSelection/TrackSelectoin';
import { useApi } from '../../hooks/useApi';
import { trackService } from '../../api/track.service';
import Pagination from '../Pagination/Pagination';
import FilterSidebar from '../trackSearchBar/trackSearchBar';
import { useEffect, useCallback, memo } from 'react';
import TrackCard from '../TrackCard/TrackCard';

// Виносимо TrackContent в окремий мемоізований компонент
const TracksContent = memo(
  ({
    allGenres,
    tracks,
    loading,
    error,
    page,
    totalPages,
    setPage,
    onBulkDelete,
    onAddToPlaylist,
  }) => {
    // Відображення стану завантаження
    if (loading) {
      return <div className={styles.loading}>Завантаження...</div>;
    }

    // Відображення помилки
    if (error) {
      return <div className={styles.error}>Помилка: {error.message}</div>;
    }

    // Порожній стан
    if (!tracks || tracks.length === 0) {
      return <div className={styles.noResults}>Треки не знайдено</div>;
    }

    return (
      <div className={styles.tracksContentWrapper}>
        <TrackSelectionManager
          tracks={tracks}
          onBulkDelete={onBulkDelete}
          onAddToPlaylist={onAddToPlaylist}
        >
          <div className={styles.tracksList}>
            {tracks.map((track) => (
              <TrackCard
                allGenres={allGenres}
                key={track.id}
                id={track.id}
                title={track.title}
                album={track.album}
                genres={track.genres}
                artist={track.artist}
                image={track.coverImage}
                audiofile={track.audioFile}
              />
            ))}
          </div>
        </TrackSelectionManager>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    );
  },
);

TracksContent.displayName = 'TracksContent';
export default TracksContent;
