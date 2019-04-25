import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers/utilities";

const initialState = {
  authError: null
};

const loginError = (state, action) => {
  console.log("login failed");
  return updateObject(state, {
    authError: "Login error"
  });
};

const loginSuccess = (state, action) => {
  console.log("login success");
  return updateObject(state, {
    authError: null
  });
};

const signOutError = (state, action) => {
  console.log("logout error");
  return state;
};

const signOutSuccess = (state, action) => {
  console.log("logout success");
  return state;
};

const registerError = (state, action) => {
  console.log("register error");
  return updateObject(state, {
    authError: action.err.message
  });
};

const registerSuccess = (state, action) => {
  console.log("register success");
  return updateObject(state, {
    authError: null
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionTypes.LOGIN_ERROR:
      return loginError(state, action);

    case actionTypes.SIGNOUT_SUCCESS:
      return signOutSuccess(state, action);

    case actionTypes.SIGNOUT_ERROR:
      return signOutError(state, action);

    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);

    case actionTypes.REGISTER_ERROR:
      return registerError(state, action);

    default:
      return state;
  }
};

export default authReducer;
