import {
  USER_LOADING_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  GET_REFRESH_TOKEN,
  USER_LOADING_ERROR,
} from "../actions/types";
import { getRouteForRole } from "../../utils/constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") !== null,
  loading: true,
  profile: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")).profile
    : "DRIVER",
  role: localStorage.getItem("userData")
    ? getRouteForRole(JSON.parse(localStorage.getItem("userData")).profile)
    : "undefined",
  user:
    localStorage.getItem("userData") === undefined ||
    localStorage.getItem("userData") === "undefined"
      ? null
      : JSON.parse(localStorage.getItem("userData")),
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload?.user?.Aa);
      localStorage.setItem("refreshToken", payload?.user?.refreshToken);
      localStorage.setItem("firstLogin", new Date());
      localStorage.setItem("loginTimeStamp", new Date());
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: null,
      };
    case GET_REFRESH_TOKEN:
      localStorage.setItem("token", payload?.token);
      localStorage.setItem("loginTimeStamp", new Date());
      return {
        ...state,
        token: payload.token,
      };
    case USER_LOADING_SUCCESS:
      localStorage.setItem("userData", JSON.stringify(payload));
      localStorage.setItem("profile", JSON.stringify(payload.profile));
      localStorage.setItem("role", getRouteForRole(payload.profile));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        profile: payload.profile,
        role: getRouteForRole(payload.profile),
      };
    case USER_LOADING_ERROR:
      localStorage.removeItem("userData");
      return {
        ...state,
        role: null,
        profile: null,
        user: null,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("loginTimeStamp");
      localStorage.removeItem("role");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;
