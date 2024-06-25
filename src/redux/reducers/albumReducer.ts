import { FETCH_ALBUMS_REQUEST, FETCH_ALBUMS_SUCCESS, FETCH_ALBUMS_FAILURE } from '../actions/albumAction';

const initialState = {
  loading: false,
  albums: [],
  error: '',
};

const albumReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ALBUMS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALBUMS_SUCCESS:
      return { loading: false, albums: action.payload, error: '' };
    case FETCH_ALBUMS_FAILURE:
      return { loading: false, albums: [], error: action.payload };
    default:
      return state;
  }
};

export default albumReducer;
