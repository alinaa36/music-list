import React from 'react';
import './trackSearchBar.css';
import { useArtist } from '../../hooks/useArtist';
import { useTracksContest } from '../../context';
import { useGenre } from '../../hooks/useGenre';
import Modal from '../modalWin/Modal';
import { useState } from 'react';
import CreateTrackForm from '../createTrackForm/CreateTrackForm';

const TrackSearchBar = () => {
  const {
    inputValue,
    handleInputChange,
    handleSearch,
    selectedArtist,
    handleArtistChange,
    selectedGenre,
    handleGenreSearch,
    setInputValue,
  } = useTracksContest();

  const [isModalOpen, setModalOpen] = useState(false);

  const { artist, error, loading } = useArtist();
  const { genres } = useGenre();

  // Скидання конкретного фільтра
  const handleClearFilter = (filterType) => {
    if (filterType === 'artist') handleArtistChange('');
    if (filterType === 'genre') handleGenreSearch('');
    if (filterType === 'search') setInputValue('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="title">
        <i className="fas fa-music" />
        <h2>Мої треки</h2>
      </div>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Пошук…"
          className="search-input"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />

        <select
          className="filter-select"
          value={selectedGenre}
          onChange={(e) => handleGenreSearch(e.target.value)}
        >
          <option value="">Всі жанри</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={selectedArtist}
          onChange={(e) => handleArtistChange(e.target.value)}
        >
          <option value="">Всі виконавці</option>
          {[...new Set(artist.map((track) => track.artist))].map(
            (artistName) => (
              <option key={artistName} value={artistName}>
                {artistName}
              </option>
            ),
          )}
        </select>

        <select className="filter-select">
          <option value="">Сортування</option>
          <option value="title">За назвою</option>
          <option value="artist">За виконавцем</option>
          <option value="genre">За жанром</option>
        </select>

        <div>
          <button onClick={() => setModalOpen(true)}>Створити трек</button>

          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <CreateTrackForm
              onSuccess={(track) => console.log('Created!', track)}
            />
          </Modal>
        </div>
      </div>

      {/* Активні фільтри */}
      <div className="active-filters">
        {inputValue && (
          <button
            className="filter-chip"
            onClick={() => handleClearFilter('search')}
          >
            Пошук: &quot;{inputValue}&quot;{' '}
            <span className="chip-close">×</span>
          </button>
        )}
        {selectedGenre && (
          <button
            className="filter-chip"
            onClick={() => handleClearFilter('genre')}
          >
            Жанр: {selectedGenre} <span className="chip-close">×</span>
          </button>
        )}
        {selectedArtist && (
          <button
            className="filter-chip"
            onClick={() => handleClearFilter('artist')}
          >
            Виконавець: {selectedArtist} <span className="chip-close">×</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackSearchBar;
