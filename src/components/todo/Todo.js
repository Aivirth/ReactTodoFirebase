import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from "../Spinner/Spinner";

class Todo extends React.Component {
  render() {
    const { items } = this.props;

    let output = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "10rem"
        }}
      >
        <Spinner />
      </div>
    );
    if (items) {
      const todoItemsOutput = items.map(item => (
        <TodoItem
          title={item.title}
          content={item.content}
          createdAt={item.createdAt}
          isCompleted={item.isCompleted}
          key={item.id}
        />
      ));

      console.log(todoItemsOutput);

      output = <div className="row">{todoItemsOutput}</div>;
    }

    return (
      <>
        <h2>
          <i className="fas fa-list" /> Todo
        </h2>
        {output}
      </>
    );
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "items"
    }
  ]),

  connect((state, props) => ({
    items: state.firestore.ordered.items
  }))
)(Todo);

Todo.propTypes = {
  firestore: PropTypes.object.isRequired,
  items: PropTypes.array
};
