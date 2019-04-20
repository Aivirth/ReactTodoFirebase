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

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return state;

    case actionTypes.GET_TODOITEMS:
      return getTodoItems(state, action);

    default:
      return state;
  }
};

export default todoReducer;
