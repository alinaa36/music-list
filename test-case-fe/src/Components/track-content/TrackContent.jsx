import styles from './TrackContent.module.css';
import { memo, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import TrackCard from '../TrackCard/TrackCard';
import useActiveTrack from '../../hooks/useActiveTrack';
import TrackSelectionManager from '../trackSelection/TrackSelectoin';

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
    const { activeTrack, playTrack, stopTrack } = useActiveTrack(); // <-- used here
    const [selectedIds, setSelectedIds] = useState([]);

    const handleToggleSelect = (id) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error)
      return <div className={styles.error}>Error: {error.message}</div>;
    if (!tracks || tracks.length === 0)
      return <div className={styles.noResults}>No tracks found</div>;

    return (
      <div className={styles.tracksContentWrapper}>
        <TrackSelectionManager
          tracks={tracks}
          onBulkDelete={onBulkDelete}
          onAddToPlaylist={onAddToPlaylist}
        >
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
              activeTrack={activeTrack}
              playTrack={playTrack}
              stopTrack={stopTrack}
              selected={selectedIds.includes(track.id)}
              onToggleSelect={() => handleToggleSelect(track.id)}
              selectable={true}
            />
          ))}
        </TrackSelectionManager>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          data-testid="pagination"
        />
      </div>
    );
  },
);

TracksContent.displayName = 'TracksContent';
export default TracksContent;
