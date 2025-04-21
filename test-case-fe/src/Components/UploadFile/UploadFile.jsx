import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTrackForm } from '../../hooks/useTrackForm';
import { trackService } from '../../api/track.service';

const UploadFile = ({ id }) => {
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // Припустимо, що завантажується один файл

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await trackService.uploadTrackFile(id, formData);
    } catch (err) {
      console.error('Помилка при запиті:', err);
    }
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
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
