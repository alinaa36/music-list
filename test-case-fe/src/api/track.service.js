import axios from 'axios';
import { ENDPOINTS } from './api';

export const trackService = {
  async getTrackList({ page = 1, limit = 3, query = {} } = {}) {
    try {
      const { sort, order, search, genre, artist } = query;
      const params = new URLSearchParams();
      params.append('page', Number(page));
      params.append('limit', Number(limit));

      if (sort && order) {
        params.append('sort', sort);
        params.append('order', order);
      }

      if (search) params.append('search', search);
      if (genre) params.append('genre', genre);
      if (artist) params.append('artist', artist);

      const response = await axios.get(`${ENDPOINTS.TRACK.LIST}`, { params });

      return response.data;
    } catch (error) {
      console.error('Error fetching track list:', error);
      throw error;
    }
  },

  async createTrack(trackData) {
    try {
      const response = await axios.post(
        `${ENDPOINTS.TRACK.CREATE}`,
        trackData.body,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating track:', error);
      throw error;
    }
  },

  async uploadTrackFile({ id, file }) {
    try {
      const response = await axios.post(
        `${ENDPOINTS.TRACK.CREATE_FILE(id)}`,
        file,
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading track file:', error);
      throw error;
    }
  },

  async updateTrack({ id, body }) {
    try {
      const response = await axios.put(`${ENDPOINTS.TRACK.UPDATE(id)}`, body);

      return response.data;
    } catch (error) {
      console.error('Error updating track:', error);
      throw error;
    }
  },
  async deleteTrack({ id }) {
    try {
      const response = await axios.delete(`${ENDPOINTS.TRACK.DELETE(id)}`);

      return response.data;
    } catch (error) {
      console.error('Error deleting track:', error);
      throw error;
    }
  },

  async deleteSelectionTracks({ ids }) {
    try {
      const response = await axios.post(`${ENDPOINTS.TRACK.DELETE_TRACKS}`, {
        ids,
      });

      return response.data;
    } catch (error) {
      console.error('Error deleting tracks:', error);
      throw error;
    }
  },

  async deletefile({ id }) {
    try {
      const response = await axios.delete(`${ENDPOINTS.TRACK.DELETE_FILE(id)}`);

      return response.data;
    } catch (error) {
      console.error('Error deleting track file:', error);
      throw error;
    }
  },
};
