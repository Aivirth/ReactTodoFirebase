import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers/utilities";

const initialState = {};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    default:
      return state;
  }
};

export default authReducer;
