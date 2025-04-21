import { useTracksContest } from '../../context';
import TrackCard from '../TrackCard/TrackCard';

import styles from './TracksList.module.css';
import { useTrackDelete } from '../../hooks/useTrackDelete';
import TrackSelectionManager from '../trackSelection/TrackSelectoin';

const TracksList = () => {
  const { tracks, error, loading, page, setPage, totalPages, refreshTracks } =
    useTracksContest();

  // Use your existing delete hook for bulk deletion
  const { deleteTrack } = useTrackDelete(() => {
    // Refresh tracks after deletion
    refreshTracks();
  });

  // Handler for bulk deletion
  const handleBulkDelete = async (selectedIds) => {
    if (
      window.confirm(
        `Ви впевнені, що хочете видалити ${selectedIds.length} треків?`,
      )
    ) {
      try {
        // Delete tracks one by one
        for (const id of selectedIds) {
          await deleteTrack(id);
        }
        // Refresh the tracks list after deletion
        refreshTracks();
      } catch (error) {
        console.error('Error deleting tracks:', error);
      }
    }
  };

  // Handler for adding to playlist (implement as needed)
  const handleAddToPlaylist = (selectedIds) => {
    console.log('Adding to playlist:', selectedIds);
    // Implement your logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!tracks || tracks.length === 0) {
    return <p>Tracks not found</p>;
  }

  return (
    <div className="home-page">
      <TrackSelectionManager
        tracks={tracks}
        onBulkDelete={handleBulkDelete}
        onAddToPlaylist={handleAddToPlaylist}
      >
        {tracks.map((track) => (
          <TrackCard
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
      </TrackSelectionManager>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={styles.pageButton}
        >
          ← Назад
        </button>
        <span className={styles.pageInfo}>
          Сторінка {page} з {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.pageButton}
        >
          Вперед →
        </button>
      </div>
    </div>
  );
};

export default TracksList;
