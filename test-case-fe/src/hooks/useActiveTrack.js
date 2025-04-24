import { useState } from 'react';

function useActiveTrack() {
  const [activeTrack, setActiveTrack] = useState(null);

  const playTrack = (id, audioElement) => {
    console.log('Playing track:', id);
    console.log('activeTrack:', audioElement);

    if (activeTrack && activeTrack.id !== id) {
      console.log('Pausing previous track,');
      activeTrack.audio.pause();
    }

    // Встановлюємо новий активний трек
    setActiveTrack({ id, audio: audioElement });

    // Якщо аудіо-елемент доступний, запускаємо відтворення
    if (audioElement) {
      audioElement.play();
    }
  };

  const stopTrack = () => {
    if (activeTrack) {
      console.log('Pausing track:', activeTrack.id);
      activeTrack.audio.pause();
      setActiveTrack(null);
    }
  };

  return {
    activeTrack,
    playTrack,
    stopTrack,
  };
}

export default useActiveTrack;
