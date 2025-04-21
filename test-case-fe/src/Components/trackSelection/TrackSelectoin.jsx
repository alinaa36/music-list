import React, { useState } from 'react';
import styles from './TrackSelection.module.css';
import { useTrackDelete } from '../../hooks/useTrackDelete';

// Component to manage track selection
const TrackSelectionManager = ({
  tracks,
  onBulkDelete,
  onAddToPlaylist,
  children,
}) => {
  // State for keeping track of selected tracks
  const [selectedTracks, setSelectedTracks] = useState([]);
  // State to toggle selection mode
  const [selectionMode, setSelectionMode] = useState(false);

  const { deleteTrack, deleteLoading, deleteError } = useTrackDelete();

  // Toggle selection mode
  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    // Clear selections when exiting selection mode
    if (selectionMode) {
      setSelectedTracks([]);
    }
  };

  // Toggle selection of a track
  const toggleTrackSelection = (trackId) => {
    setSelectedTracks((prev) => {
      if (prev.includes(trackId)) {
        return prev.filter((id) => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  // Select all tracks
  const selectAllTracks = () => {
    const allTrackIds = tracks.map((track) => track.id);
    setSelectedTracks(allTrackIds);
  };

  // Deselect all tracks
  const deselectAllTracks = () => {
    setSelectedTracks([]);
  };

  // Handle bulk actions on selected tracks
  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on tracks:`, selectedTracks);

    if (action === 'delete' && onBulkDelete) {
      onBulkDelete(selectedTracks);
    }
  };

  // Clone children with additional props
  const childrenWithProps = Array.isArray(children)
    ? children.map((child) => {
        if (!child) return null;

        // Find corresponding track data
        const trackData = tracks.find((track) => track.id === child.props.id);
        if (!trackData) return child;

        return React.cloneElement(child, {
          selectable: selectionMode,
          selected: selectedTracks.includes(child.props.id),
          onToggleSelect: () => toggleTrackSelection(child.props.id),
        });
      })
    : children &&
      React.cloneElement(children, {
        selectable: selectionMode,
        selected: selectedTracks.includes(children.props.id),
        onToggleSelect: () => toggleTrackSelection(children.props.id),
      });

  return (
    <div className={styles.trackSelectionContainer}>
      {/* Selection mode controls */}
      <div className={styles.selectionControls}>
        <button
          className={`${styles.selectionButton} ${selectionMode ? styles.active : ''}`}
          onClick={toggleSelectionMode}
        >
          {selectionMode ? 'Вийти з режиму вибору' : 'Вибрати треки'}
        </button>

        {selectionMode && (
          <>
            <div className={styles.selectionActions}>
              <button onClick={selectAllTracks} className={styles.actionButton}>
                Вибрати всі
              </button>
              <button
                onClick={deselectAllTracks}
                className={styles.actionButton}
                disabled={selectedTracks.length === 0}
              >
                Скасувати вибір
              </button>
              <span className={styles.selectedCount}>
                Вибрано: {selectedTracks.length}
              </span>
            </div>

            {selectedTracks.length > 0 && (
              <div className={styles.bulkActions}>
                <button
                  onClick={() => deleteTrack(selectedTracks)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  Видалити вибрані
                </button>
                <button
                  onClick={() => handleBulkAction('addToPlaylist')}
                  className={styles.actionButton}
                >
                  Додати до плейлиста
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Render the child components with additional props */}
      <div className={styles.tracksList}>{childrenWithProps}</div>
    </div>
  );
};

export default TrackSelectionManager;
