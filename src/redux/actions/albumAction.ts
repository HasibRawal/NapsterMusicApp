import { Dispatch } from 'redux';
import { getTopAlbums } from '../../services/napsterApi';

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

const fetchAlbumsRequest = () => ({ type: FETCH_ALBUMS_REQUEST });
const fetchAlbumsSuccess = (albums: any) => ({ type: FETCH_ALBUMS_SUCCESS, payload: albums });
const fetchAlbumsFailure = (error: string) => ({ type: FETCH_ALBUMS_FAILURE, payload: error });

export const fetchAlbums = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchAlbumsRequest());
    getTopAlbums()
      .then(response => dispatch(fetchAlbumsSuccess(response.data.albums)))
      .catch(error => dispatch(fetchAlbumsFailure(error.message)));
  };
};
