import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types";
import { API_URL } from "../../components/config/config";
import { showNotification } from "./notificationActions";

export const register = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL + "/api/auth/register", credentials);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(showNotification({type: 'success', message: "Registeration Successful", sticky: false}))
  } catch (error) {
    console.error(error);
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response ? error.response.data : "An Error occured",
    });
    dispatch(showNotification({type: 'error', message: `Registeration Failed ${error.response.data.message ? error.response.data.message : error.response.data.error}`, sticky: false}))
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(API_URL + "/api/auth/login", credentials);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(showNotification({type: 'success', message: "Login Successful", sticky: false}))
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data : "An Error occured",
    });
    dispatch(showNotification({type: 'error', message: `Login Failed ${error.response.data.message ? error.response.data.message : error.response.data.error}`, sticky: false}))
  }
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(showNotification({type: 'success', message: "Logout Successful", sticky: false}))
    dispatch({ type: LOGOUT });
    
  };
};