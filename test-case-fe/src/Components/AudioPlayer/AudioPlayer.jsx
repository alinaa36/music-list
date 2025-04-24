import { useRef, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function AudioPlayer({ audioUrl, idTrack, isActive, playTrack, stopTrack }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isActive) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isActive]);

  const handleTogglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isActive) {
      stopTrack();
    } else {
      playTrack(idTrack, audio);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  return (
    <div data-testid={`audio-player-${idTrack}`}>
      <IconButton
        aria-label="toggle playback"
        onClick={handleTogglePlayback}
        data-testid={
          isActive ? `pause-button-${idTrack}` : `play-button-${idTrack}`
        }
      >
        {isActive ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
      >
        <track
          kind="captions"
          src="captions.vtt"
          srcLang="en"
          label="English captions"
        />
      </audio>

      <div
        data-testid={`audio-progress-${idTrack}`}
        style={{
          width: `${progress}%`,
          height: '5px',
          backgroundColor: '#4caf50', // або будь-який інший колір для індикатора прогресу
        }}
      />
    </div>
  );
}

export default AudioPlayer;
