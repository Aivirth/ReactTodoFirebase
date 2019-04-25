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

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .catch(err => dispatch({ type: actionTypes.SIGNOUT_ERROR, err }))
      .then(() => dispatch({ type: actionTypes.SIGNOUT_SUCCESS }));
  };
};

export const register = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        return firestore
          .collection("user")
          .doc(response.user.uid)
          .set({
            email: newUser.email,
            nickname: newUser.nickname
          });
      })
      .then(() => dispatch({ type: actionTypes.REGISTER_SUCCESS }))
      .catch(err => dispatch({ type: actionTypes.REGISTER_ERROR, err }));
  };
};
