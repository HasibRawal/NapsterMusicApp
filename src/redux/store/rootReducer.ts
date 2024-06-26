import { combineReducers } from 'redux';
import albumReducer from '../reducers/albumReducer';
import trackReducer from '../reducers/trackReducer';

const rootReducer = combineReducers({
  albums: albumReducer,
  tracks:trackReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
