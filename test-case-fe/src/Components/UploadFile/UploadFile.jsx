import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTrackForm } from '../../hooks/useTrackForm';
import { trackService } from '../../api/track.service';
import { useApi } from '../../hooks/useApi';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import styles from '../TrackCard/TrackCard.module.css';

const UploadFile = ({ id }) => {
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const formData = new FormData();
    formData.append('file', file);

    await apiHook.execute({
      method: 'POST',
      customParams: { id, file: formData },
    });
  };
  const apiHook = useApi(trackService.uploadTrackFile, { autoExecute: false });
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      className={styles.iconButton}
      data-testid={'upload-track-${id}'}
    >
      <AudioFileIcon />
      <input
        type="file"
        onChange={handleFileUpload}
        multiple
        style={{ display: 'none' }}
      />
    </Button>
  );
};
export default UploadFile;
