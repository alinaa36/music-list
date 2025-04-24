import React, { useState, useEffect } from 'react';

import styles from './AudioWaveform.module.css';
import { AudioVisualizer } from 'react-audio-visualize';

const AudioWaveform = ({
  audioUrl,
  isPlaying,
  currentTime,
  duration,
  title,
}) => {
  const [audioData, setAudioData] = useState(null);

  // Стан для аудіо-даних
  useEffect(() => {
    if (!audioUrl) return;
    setAudioData(audioUrl);
  }, [audioUrl]);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h4 className={styles.trackTitle}>{title}</h4>
        <div className={styles.waveformContainer}>
          {audioData && (
            <AudioVisualizer
              audio={audioData}
              play={isPlaying}
              height={100}
              width={600}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          )}
        </div>
        <div className={styles.timeInfo}>
          <span>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)}`}</span>{' '}
          /
          <span>{`${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioWaveform;
