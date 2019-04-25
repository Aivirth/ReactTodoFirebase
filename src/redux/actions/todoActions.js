import * as actionsTypes from "./actionsTypes";

export const addItem = newItem => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("items")
      .add({
        ...newItem,
        authorNickname: profile.nickname,
        authorId: authorId
      })
      .then(() => {
        dispatch({ type: actionsTypes.ADD_ITEM, item: newItem });
      })
      .catch(err => dispatch({ type: actionsTypes.ADD_ITEM_FAILURE, err }));
  };
};
