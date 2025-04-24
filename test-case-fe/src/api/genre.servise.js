import axios from 'axios';

export const genreService = {
  async getGenreList() {
    try {
      const response = await axios.get('http://localhost:3000/api/genres');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching genre list:', error);
      throw error;
    }
  },
};
