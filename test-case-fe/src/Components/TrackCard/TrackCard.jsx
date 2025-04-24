import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './TrackCard.module.css';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import UploadFile from '../UploadFile/UploadFile';
import CreateTrackForm from '../createTrackForm/CreateTrackForm';
import { useState } from 'react';
import Modal from '../modalWin/Modal';
import Delete from '../Delete/Delete';
import { useAudioDelete } from '../../hooks/useAudioDelete';
import AudoiDelete from '../audoi-delete/AudioDelete';

const TrackCard = ({
  allGenres,
  id,
  title,
  artist,
  album,
  image,
  audiofile,
  genres,
  selectable = false,
  selected = false,
  onToggleSelect,
  activeTrack,
  playTrack,
  stopTrack,
}) => {
  const [modalType, setModalType] = useState(null);
  const audioUrl = `http://localhost:8000/api/files/${audiofile}`;

  const closeModal = () => {
    setModalType(null);
  };

  const existingTrack = {
    id,
    title,
    artist,
    album,
    coverUrl: image,
    genres,
  };

  const handleCardClick = (e) => {
    console.log('Toggle selection for:', id);
    if (selectable && onToggleSelect) {
      e.stopPropagation();
      onToggleSelect();
    }
  };

  return (
    <>
      <div
        className={`${styles.card} ${selectable ? styles.selectable : ''} ${selected ? styles.selected : ''}`}
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        data-testid={`track-item-${id}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(e);
          }
        }}
      >
        {/* Selection indicator */}
        {selectable && (
          <div className={styles.selectionIndicator}>
            <CheckCircleIcon
              className={`${styles.checkIcon} ${selected ? styles.checked : ''}`}
            />
          </div>
        )}

        <div className={styles.contentWrapper}>
          <div className={styles.albumWrapper}>
            <img src={image} alt="Album Cover" className={styles.albumCover} />
          </div>
          <div className={styles.trackInfo}>
            <h6 data-testid={`track-item-${id}-title`}>{title}</h6>
            <p
              className={styles.artist}
              data-testid={`track-item-${id}-artist`}
            >
              {artist}
            </p>
          </div>
        </div>

        <div className={styles.controlsWrapper}>
          <div className={styles.playbackControls}>
            <button
              aria-label="play/pause"
              className={styles.iconButton}
            ></button>
            <AudioPlayer
              idTrack={id}
              audioUrl={`http://localhost:8000/api/files/${audiofile}`}
              isActive={activeTrack?.id === id}
              playTrack={playTrack}
              stopTrack={stopTrack}
            />
            <p className={styles.timer}>0:00 / 0:00</p>
          </div>

          {!selectable && (
            <div className={styles.actionButtons}>
              <button
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalType('edit');
                }}
                className={styles.iconButton}
                data-testid={`edit-track-${id}`}
              >
                <EditIcon />
              </button>
              <button
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalType('delete');
                }}
              >
                <DeleteIcon />
              </button>
              {audiofile ? (
                <button
                  aria-label="delete-audio"
                  onClick={async (e) => {
                    e.stopPropagation();
                    setModalType('delete-audio');
                  }}
                >
                  <DeleteIcon />
                </button>
              ) : (
                <UploadFile id={id} />
              )}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === 'edit' && (
          <CreateTrackForm
            allGenres={allGenres}
            initialData={existingTrack}
            onSuccess={(track) => {
              console.log('Оновлено!', track);
              closeModal();
            }}
          />
        )}
        {modalType === 'delete' && (
          <>
            <Delete id={id} onClose={closeModal} />
          </>
        )}
        {modalType === 'delete-audio' && (
          <AudoiDelete
            id={id}
            onClose={closeModal}
            onDelete={() => {
              console.log('Audio deleted');
              closeModal();
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default TrackCard;
