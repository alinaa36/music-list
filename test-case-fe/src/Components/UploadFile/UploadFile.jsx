import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTrackForm } from '../../hooks/useTrackForm';
import { trackService } from '../../api/track.service';
import { useApi } from '../../hooks/useApi';

const UploadFile = ({ id }) => {
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const formData = new FormData();
    formData.append('file', file);
    console.log('id', id);

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
