import axios from 'axios';

export const ArtistServise = {
  async getArtistlist() {
    try {
      const response = await axios.get('http://localhost:3000/api/tracks');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching artist list:', error);
      throw error;
    }
  },
};
