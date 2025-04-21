import { useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <IconButton aria-label="volume" onClick={handleTogglePlayback}>
        <VolumeUpIcon />
      </IconButton>

      {/* Прихований, але керований елемент <audio> */}
      <audio ref={audioRef} src={audioUrl} preload="auto">
        <track
          kind="captions"
          src="captions.vtt"
          srcLang="en"
          label="English captions"
        />
      </audio>
    </div>
  );
}

export default AudioPlayer;
