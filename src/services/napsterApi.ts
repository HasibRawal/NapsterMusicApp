import axios from 'axios';

const API_KEY = 'YTUyNzJlMzUtODE0MS00MTFmLWJjM2MtYzJkMmU1MjdkNWFh';
const BASE_URL = 'https://api.napster.com/v2.2';

const napsterApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'apikey': API_KEY,
  },
});

export const getTopAlbums = () => napsterApi.get('/albums/top');
export const getAlbumTracks = (albumId: string) => napsterApi.get(`/albums/${albumId}/tracks`);
