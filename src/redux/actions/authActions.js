import * as actionTypes from "./actionsTypes";
export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch(err => dispatch({ type: actionTypes.LOGIN_ERROR, err }))
      .then(() => dispatch({ type: actionTypes.LOGIN_SUCCESS }));
  };
};
