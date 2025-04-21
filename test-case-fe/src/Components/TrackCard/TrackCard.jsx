import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
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

const TrackCard = ({
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
}) => {
  const [modalType, setModalType] = useState(null);
  const audioUrl = `http://localhost:3000/api/files/${audiofile}`;

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

  const { deleteAudio, audioDeleteLoading } = useAudioDelete(() => {
    console.log('Оновити UI після видалення аудіо');
    // Тут можна, наприклад, викликати onDeleteSuccess() або оновити стан
  });

  // Handle click event differently based on selection mode
  const handleCardClick = (e) => {
    if (selectable && onToggleSelect) {
      e.stopPropagation();
      onToggleSelect();
    }
  };

  return (
    <>
      <Card
        className={`${styles.card} ${selectable ? styles.selectable : ''} ${selected ? styles.selected : ''}`}
        onClick={handleCardClick}
      >
        {/* Selection indicator */}
        {selectable && (
          <div className={styles.selectionIndicator}>
            <CheckCircleIcon
              className={`${styles.checkIcon} ${selected ? styles.checked : ''}`}
            />
          </div>
        )}

        <Box className={styles.contentWrapper}>
          <Box className={styles.albumWrapper}>
            <img src={image} alt="Album Cover" className={styles.albumCover} />
          </Box>
          <CardContent className={styles.trackInfo}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {artist}
            </Typography>
          </CardContent>
        </Box>

        <Box className={styles.controlsWrapper}>
          <Box className={styles.playbackControls}>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon />
            </IconButton>
            <AudioPlayer audioUrl={audioUrl} />
            <Typography variant="body2" className={styles.timer}>
              0:00 / 0:00
            </Typography>
          </Box>

          {!selectable && (
            <Stack direction="row" spacing={1} className={styles.actionButtons}>
              <IconButton
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalType('edit');
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalType('delete');
                }}
              >
                <DeleteIcon />
              </IconButton>
              {audiofile ? (
                <IconButton
                  aria-label="delete-audio"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteAudio(id);
                  }}
                  disabled={audioDeleteLoading}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <UploadFile id={id} />
              )}
            </Stack>
          )}
        </Box>
      </Card>

      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === 'edit' && (
          <CreateTrackForm
            initialData={existingTrack}
            onSuccess={(track) => {
              console.log('Оновлено!', track);
              closeModal();
            }}
          />
        )}
        {modalType === 'delete' && <Delete id={id} onClose={closeModal} />}
      </Modal>
    </>
  );
};

export default TrackCard;
