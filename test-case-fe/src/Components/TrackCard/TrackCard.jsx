import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import styles from './TrackCard.module.css';

const TrackCard = ({ title, artist, image }) => {
  return (
    <Card className={styles.card}>
      <Box className={styles.contentWrapper}>
        <CardMedia
          component="img"
          className={styles.albumCover}
          image={image}
          alt="Album Cover"
        />
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
          <IconButton aria-label="volume">
            <VolumeUpIcon />
          </IconButton>
          <Typography variant="body2" className={styles.timer}>
            0:00 / 0:00
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} className={styles.actionButtons}>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="download">
            <DownloadIcon />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
};

export default TrackCard;
