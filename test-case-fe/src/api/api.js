export const BASE_URL = process.env.REACT_APP_API_URL;
console.log('BASE_URL:', BASE_URL);

export const ENDPOINTS = {
  TRACK: {
    LIST: `${BASE_URL}/tracks`,
    CREATE: `${BASE_URL}/tracks`,
    DELETE: (id) => `${BASE_URL}/tracks/${id}`,
    UPDATE: (id) => `${BASE_URL}/tracks/${id}`,
    DELETE_FILE: (id) => `${BASE_URL}/tracks/${id}/file`,
    DELETE_TRACKS: `${BASE_URL}/tracks/delete`,
    CREATE_FILE: (id) => `${BASE_URL}/tracks/${id}/upload`,
  },
  GENRES: {
    LIST: `${BASE_URL}/genres`,
  },
};
