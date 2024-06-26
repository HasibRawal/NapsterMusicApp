import { Dispatch } from 'redux';
import { getAlbumTracks } from '../../services/napsterApi'; 
import { Track } from '../../types'; 
export const FETCH_ALBUM_TRACKS_REQUEST = 'FETCH_ALBUM_TRACKS_REQUEST';
export const FETCH_ALBUM_TRACKS_SUCCESS = 'FETCH_ALBUM_TRACKS_SUCCESS';
export const FETCH_ALBUM_TRACKS_FAILURE = 'FETCH_ALBUM_TRACKS_FAILURE';

interface FetchAlbumTracksRequestAction {
  type: typeof FETCH_ALBUM_TRACKS_REQUEST;
}

interface FetchAlbumTracksSuccessAction {
  type: typeof FETCH_ALBUM_TRACKS_SUCCESS;
  payload: Track[];
}

interface FetchAlbumTracksFailureAction {
  type: typeof FETCH_ALBUM_TRACKS_FAILURE;
  payload: string;
}

export type AlbumTracksActionTypes =
  | FetchAlbumTracksRequestAction
  | FetchAlbumTracksSuccessAction
  | FetchAlbumTracksFailureAction;

const fetchAlbumTracksRequest = (): FetchAlbumTracksRequestAction => ({
  type: FETCH_ALBUM_TRACKS_REQUEST,
});

const fetchAlbumTracksSuccess = (tracks: Track[]): FetchAlbumTracksSuccessAction => ({
  type: FETCH_ALBUM_TRACKS_SUCCESS,
  payload: tracks,
});

const fetchAlbumTracksFailure = (error: string): FetchAlbumTracksFailureAction => ({
  type: FETCH_ALBUM_TRACKS_FAILURE,
  payload: error,
});

export const fetchAlbumTracks = (albumId: string) => {
  return (dispatch: Dispatch<AlbumTracksActionTypes>) => {
    dispatch(fetchAlbumTracksRequest());
    getAlbumTracks(albumId)
      .then(response => {
        console.log(response?.data?.tracks,')))))))))reponse')
        const tracks: Track[] = response.data.tracks.map((track: any) => ({
          id: track.id,
          name: track.name,
          artistName: track.artistName.split(', '),
          albumCoverUrl: track.albumCoverUrl,
          previewUrl: track.previewURL,
          playbackSeconds: track.playbackSeconds,
        }));
        dispatch(fetchAlbumTracksSuccess(tracks));
      })
      .catch(error => dispatch(fetchAlbumTracksFailure(error.message)));
  };
};
