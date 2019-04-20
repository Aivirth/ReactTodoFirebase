import * as actionsTypes from "./actionsTypes";

export const addItem = newItem => {
  return (dispatch, getState) => {
    dispatch({ type: actionsTypes.ADD_ITEM, item: newItem });
  };
};
