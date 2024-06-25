import { combineReducers } from 'redux';
import albumReducer from '../reducers/albumReducer';

const rootReducer = combineReducers({
  albums: albumReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
