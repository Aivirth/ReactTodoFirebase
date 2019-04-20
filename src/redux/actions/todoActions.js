import * as actionsTypes from "./actionsTypes";

export const createProject = newItem => {
  return (dispatch, getState) => {
    dispatch({ type: actionsTypes.ADD_ITEM, item: newItem });
  };
};
