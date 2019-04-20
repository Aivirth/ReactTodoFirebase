import * as actionsTypes from "./actionsTypes";

export const addItem = newItem => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("items")
      .add({
        ...newItem
      })
      .then(() => {
        dispatch({ type: actionsTypes.ADD_ITEM, item: newItem });
      })
      .catch(err => console.log(err));
  };
};
