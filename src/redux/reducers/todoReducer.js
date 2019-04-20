import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../helpers/utilities";

const initialState = {
  items: [
    {
      title: "lorem",
      content: "lorem did shdosds",
      dueDate: new Date(),
      isCompleted: false,
      id: "jdodjdossls"
    }
  ]
};

const getTodoItems = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const addItem = (state, action) => {
  console.log("AddItem:", action.item);
  return null;
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return addItem(state, action);

    case actionTypes.GET_TODOITEMS:
      return getTodoItems(state, action);

    default:
      return state;
  }
};

export default todoReducer;
