import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers/utilities";

const initialState = {
  items: []
};

const addItem = (state, action) => {
  console.log("AddItem:", action.item);
  return null;
};
const addItemFailure = (state, action) => {
  console.log(action.err);
  return null;
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return addItem(state, action);

    case actionTypes.ADD_ITEM_FAILURE:
      return addItemFailure(state, action);

    default:
      return state;
  }
};

export default todoReducer;
