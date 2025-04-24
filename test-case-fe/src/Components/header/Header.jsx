// Components/TracksList/TracksHeader.jsx
import React from 'react';
import styles from './Header.module.css';

const TracksHeader = ({ onCreateClick }) => {
  return (
    <div className={styles.header}>
      <button
        onClick={onCreateClick}
        className={styles.createButton}
        data-testid="create-track-button"
      >
        Створити трек
      </button>
    </div>
  );
};

export default TracksHeader;
