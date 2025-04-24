import axios from 'axios';
import { ENDPOINTS } from './api';

export const genreService = {
  async getGenreList() {
    try {
      const response = await axios.get(`${ENDPOINTS.GENRES.LIST}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching genre list:', error);
      throw error;
    }
  },
};
