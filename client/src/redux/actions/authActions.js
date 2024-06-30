import axios from 'axios';
import ApiRoute from '../../utils/apiRoutes';
import {
  USER_LOADING_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  GET_REFRESH_TOKEN,
  //   LOGIN_FAIL
} from './types';

/**
 * get new token from refresh token token
 */
export const getRefreshToken = (data) => async (dispatch) => {
  try {
    const res = await axios.post(ApiRoute.getRefreshToken, data);
    // console.log(res.data)
    dispatch({
      type: GET_REFRESH_TOKEN,
      payload: res.data,
    });
    return;

  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

/**
 * Logout user
 */
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

/**
 * login user
 */
export const login = (data) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data
  });
};

/**
 * login user
 */
 export const userLoaded = (data) => (dispatch) => {
  dispatch({
    type: USER_LOADING_SUCCESS,
    payload: data
  });
};
