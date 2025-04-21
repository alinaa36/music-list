import { use } from 'react';
import { ArtistServise } from '../api/artist.servise';
import { useEffect, useState } from 'react';

export function useArtist() {
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await ArtistServise.getArtistlist();
        setArtist(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, []);

  return {
    artist,
    loading,
    error,
  };
}
