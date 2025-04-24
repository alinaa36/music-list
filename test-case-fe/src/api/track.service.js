import axios from 'axios';
import { ENDPOINTS } from './api';

export const trackService = {
  async getTrackList({ page = 1, limit = 3, query = {} } = {}) {
    try {
      const { sort, order, search, genre, artist } = query;
      const params = new URLSearchParams();

      // Додаємо базові параметри пагінації
      params.append('page', Number(page));
      params.append('limit', Number(limit));

      if (sort && order) {
        params.append('sort', sort);
        params.append('order', order);
      }

      if (search) params.append('search', search);
      if (genre) params.append('genre', genre);
      if (artist) params.append('artist', artist);

      // Використовуємо базовий URL з констант
      const response = await axios.get(`${ENDPOINTS.TRACK.LIST}`, { params });

      console.log('API Response:', response);
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
        `${ENDPOINTS.TRACK.CREATE}`,
        trackData.body,
      );
      console.log('Track created:', response.data);
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

      console.log('Track file uploaded:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading track file:', error);
      throw error;
    }
  },

  async updateTrack({ id, body }) {
    try {
      console.log('trackData', body);
      const response = await axios.put(`${ENDPOINTS.TRACK.UPDATE(id)}`, body);
      console.log('Track updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating track:', error);
      throw error;
    }
  },
  async deleteTrack({ id }) {
    try {
      const response = await axios.delete(`${ENDPOINTS.TRACK.DELETE(id)}`);
      console.log('Track deleted:', response.data);
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
      console.log('Tracks deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting tracks:', error);
      throw error;
    }
  },

  async deletefile({ id }) {
    try {
      const response = await axios.delete(`${ENDPOINTS.TRACK.DELETE_FILE(id)}`);
      console.log('Track file deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting track file:', error);
      throw error;
    }
  },
};
