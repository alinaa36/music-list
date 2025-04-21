import { useEffect, useState } from 'react';
import { trackService } from '../api/track.service';

export function useTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1); // нове
  const [totalPages, setTotalPages] = useState(1); // нове
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);

        if (selectedArtist) {
          const response = await trackService.getTrackList(1, 9999);
          const filteredTracks = response.data.filter(
            (track) => track.artist === selectedArtist,
          );
          setTracks(filteredTracks);
          setTotalPages(1);
          return;
        }
        if (selectedGenre) {
          const response = await trackService.getTrackList(1, 9999);
          const filteredTracks = response.data.filter((track) =>
            track.genres.includes(selectedGenre),
          );
          setTracks(filteredTracks);
          setTotalPages(1);
          return;
        }
        if (activeSearchTerm.trim()) {
          const response = await trackService.getTrackTitle(activeSearchTerm);
          setTracks(response);
        } else {
          // Стандартна пагінація
          const response = await trackService.getTrackList(page, 3);
          setTracks(response.data);
          setTotalPages(Math.ceil(response.total / 3));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [activeSearchTerm, page, selectedArtist, selectedGenre]);
  const handleGenreSearch = (genre) => {
    setSelectedGenre(genre);
    setPage(1); // почати з першої сторінки після фільтрації
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSearch = () => {
    setActiveSearchTerm(inputValue);
  };

  const handleArtistChange = (artistName) => {
    setSelectedArtist(artistName);
    setPage(1); // почати з першої сторінки після фільтрації
  };

  return {
    tracks,
    loading,
    error,
    inputValue,
    handleInputChange,
    handleSearch,
    page,
    setPage,
    totalPages,
    selectedArtist,
    handleArtistChange,
    selectedGenre,
    handleGenreSearch,
  };
}
