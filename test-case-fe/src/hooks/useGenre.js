import { genreService } from '../api/genre.servise';
import { useEffect, useState } from 'react';

export function useGenre() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await genreService.getGenreList();
        console.log(response);
        setGenres(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
}
