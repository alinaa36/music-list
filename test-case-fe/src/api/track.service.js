import axios from 'axios';

export const trackService = {
  async getTrackList(page = 1, limit = 3) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/tracks?page=${page}&limit=${limit}`,
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching track list:', error);
      throw error;
    }
  },

  async getTrackTitle(title) {
    try {
      const slug = title
        .trim()
        .toLowerCase()
        .replace(/'/g, '') // видаляє апострофи
        .replace(/\s+/g, '-') // пробіли → дефіси
        .replace(/[^a-z0-9-]/g, ''); // прибирає всі інші символи
      const response = await axios.get(
        `http://localhost:3000/api/tracks/${slug}`,
      );
      console.log(response.data);
      return [response.data];
    } catch (error) {
      console.error('Error fetching track title:', error);
      throw error;
    }
  },

  async createTrack(trackData) {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/tracks',
        trackData,
      );
      console.log('Track created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating track:', error);
      throw error;
    }
  },

  async uploadTrackFile(id, file) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/tracks/${id}/upload`,
        file,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Track file uploaded:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading track file:', error);
      throw error;
    }
  },

  async updateTrack(id, trackData) {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/tracks/${id}`,
        trackData,
      );
      console.log('Track updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating track:', error);
      throw error;
    }
  },
  async deleteTrack(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/tracks/${id}`,
      );
      console.log('Track deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting track:', error);
      throw error;
    }
  },

  async deleteSelectionTracks(ids) {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/tracks/delete',
        {
          ids,
        },
      );
      console.log('Tracks deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting tracks:', error);
      throw error;
    }
  },

  async deletefile(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/tracks/${id}/file`,
      );
      console.log('Track file deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting track file:', error);
      throw error;
    }
  },
};
