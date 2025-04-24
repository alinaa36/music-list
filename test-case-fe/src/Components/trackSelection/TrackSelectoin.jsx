import React, { useState } from 'react';
import styles from '../track-content/TrackContent.module.css';
import { useTrackDelete } from '../../hooks/useTrackDelete';
import { useApi } from '../../hooks/useApi';
import { trackService } from '../../api/track.service';

// Component to manage track selection
const TrackSelectionManager = ({
  tracks,
  onBulkDelete,
  onAddToPlaylist,
  children,
}) => {
  const [selectedTracks, setSelectedTracks] = useState([]);

  const [selectionMode, setSelectionMode] = useState(false);
  const apiHook = useApi(trackService.deleteSelectionTracks);

  const { deleteTrack, deleteLoading, deleteError } = useTrackDelete();

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);

    if (selectionMode) {
      setSelectedTracks([]);
    }
  };

  const toggleTrackSelection = (trackId) => {
    setSelectedTracks((prev) => {
      if (prev.includes(trackId)) {
        return prev.filter((id) => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  const selectAllTracks = () => {
    const allTrackIds = tracks.map((track) => track.id);
    setSelectedTracks(allTrackIds);
  };

  const handleDelete = async () => {
    await apiHook.execute({
      method: 'POST',
      customParams: { ids: selectedTracks },
    });
  };

  const deselectAllTracks = () => {
    setSelectedTracks([]);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on tracks:`, selectedTracks);

    if (action === 'delete' && onBulkDelete) {
      onBulkDelete(selectedTracks);
    }
  };

  const childrenWithProps = Array.isArray(children)
    ? children.map((child) => {
        if (!child) return null;

        const trackData = tracks.find((track) => track.id === child.props.id);
        if (!trackData) return child;

        return React.cloneElement(child, {
          selectable: selectionMode,
          selected: selectedTracks.includes(child.props.id),
          onToggleSelect: () => toggleTrackSelection(child.props.id),
          'data-testid': `track-checkbox-${child.props.id}`,
        });
      })
    : children &&
      React.cloneElement(children, {
        selectable: selectionMode,
        selected: selectedTracks.includes(children.props.id),
        onToggleSelect: () => toggleTrackSelection(children.props.id),
        'data-testid': `track-checkbox-${children.props.id}`,
      });

  return (
    <div className={styles.trackSelectionContainer}>
      <div className={styles.selectionControls}>
        <button
          className={`${styles.selectionButton} ${selectionMode ? styles.active : ''}`}
          onClick={toggleSelectionMode}
          data-testid="select-mode-toggle"
        >
          {selectionMode ? 'Exit selection mode' : 'Select tracks'}
        </button>

        {selectionMode && (
          <>
            <div className={styles.selectionActions}>
              <button
                onClick={selectAllTracks}
                className={styles.actionButton}
                data-testid="select-all"
              >
                Select all
              </button>
              <button
                onClick={deselectAllTracks}
                className={styles.actionButton}
                disabled={selectedTracks.length === 0}
                data-testid="deselect-all"
              >
                Deselect all
              </button>
              <span className={styles.selectedCount}>
                Selected: {selectedTracks.length}
              </span>
            </div>

            {selectedTracks.length > 0 && (
              <div className={styles.bulkActions}>
                <button
                  onClick={() => deleteTrack(handleDelete(selectedTracks))}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  data-testid="bulk-delete-button"
                >
                  Delete selected
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.tracksList}>{childrenWithProps}</div>
    </div>
  );
};

export default TrackSelectionManager;
