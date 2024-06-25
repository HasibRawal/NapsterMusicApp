import { Dispatch } from 'redux';
import { getTopAlbums } from '../../services/napsterApi';
import { Album } from '../../types';

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

interface FetchAlbumsRequestAction {
  type: typeof FETCH_ALBUMS_REQUEST;
}

interface FetchAlbumsSuccessAction {
  type: typeof FETCH_ALBUMS_SUCCESS;
  payload: Album[];
}

interface FetchAlbumsFailureAction {
  type: typeof FETCH_ALBUMS_FAILURE;
  payload: string;
}

export type AlbumActionTypes = 
  | FetchAlbumsRequestAction
  | FetchAlbumsSuccessAction
  | FetchAlbumsFailureAction;

const fetchAlbumsRequest = (): FetchAlbumsRequestAction => ({
  type: FETCH_ALBUMS_REQUEST,
});

const fetchAlbumsSuccess = (albums: Album[]): FetchAlbumsSuccessAction => ({
  type: FETCH_ALBUMS_SUCCESS,
  payload: albums,
});

const fetchAlbumsFailure = (error: string): FetchAlbumsFailureAction => ({
  type: FETCH_ALBUMS_FAILURE,
  payload: error,
});

export const fetchAlbums = () => {
  return (dispatch: Dispatch<AlbumActionTypes>) => {
    dispatch(fetchAlbumsRequest());
    getTopAlbums()
      .then(response => {
        if (response.data && response.data.albums) {
          const albums: Album[] = response.data.albums.map((album: any) => ({
            id: album?.id ?? 'Unknown ID',
            name: album?.name ?? 'Unknown Name',
            artistNames: album?.artistName ? album.artistName.split(', ') : ['Unknown Artist'],
            releaseDate: album?.released ? new Date(album.released).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown Date',
            trackCount: album?.trackCount ?? 0,
            coverImageUrl: album?.images?.[0]?.url ?? '',
          }));
          dispatch(fetchAlbumsSuccess(albums));
        } else {
          throw new Error('Invalid response structure');
        }
      })
      .catch(error => dispatch(fetchAlbumsFailure(error.message)));
  };
};
