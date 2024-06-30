import {
  SET_LOADER,
  REMOVE_LOADER
} from '../actions/types';

const initialState = false;

function loaderReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADER:
      return true;
    case REMOVE_LOADER:
      return false;
    default:
      return state;
  }
}

export default loaderReducer;
