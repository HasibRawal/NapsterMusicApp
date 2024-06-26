import { AlbumTracksActionTypes, FETCH_ALBUM_TRACKS_REQUEST, FETCH_ALBUM_TRACKS_SUCCESS, FETCH_ALBUM_TRACKS_FAILURE } from '../actions/trackAction'
;
import { Track } from '../../types';
interface TracksState {
  tracks: Track[];
  loading: boolean;
  error: string | null;
}

const initialState: TracksState = {
  tracks: [],
  loading: false,
  error: null,
};

const trackReducer = (state = initialState, action: AlbumTracksActionTypes): TracksState => {
  switch (action.type) {
    case FETCH_ALBUM_TRACKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ALBUM_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_ALBUM_TRACKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default trackReducer;
