import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "../Constants";
import SetAuthHeader from "../Utils/SetAuthHeader";

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("http://localhost:7000/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      SetAuthHeader(token);
      dispatch(getCurrentUser());
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:7000/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getCurrentUser = () => (dispatch) => {
  axios
    .get("http://localhost:7000/api/users")
    .then((res) => dispatch(setCurrentUser(res.data)));
};

export const setCurrentUser = (data) => {
  return {
    type: SET_CURRENT_USER,
    payload: data,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  SetAuthHeader();
  dispatch(setCurrentUser());
};
