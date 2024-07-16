import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload?.user,
        token: action.payload?.token,
        isAuthenticated: true,
        error: null,
      };
      case REGISTER_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };
      case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload?.user,
        token: action.payload?.token,
        isAuthenticated: true,
        error: null,
      };
      case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };
      case LOGOUT:
        return {
          ...state,
          user: null,
          token: null,
          isAuthenticated: false,
        };
    default:
      return state;
  }
};

export default authReducer;