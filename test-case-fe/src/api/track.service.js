import axios from 'axios';

export const trackService = {
  async getTrackList() {
    try {
      const response = await axios.get('http://localhost:3000/api/tracks');
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching track list:', error);
      throw error;
    }
  },
};
