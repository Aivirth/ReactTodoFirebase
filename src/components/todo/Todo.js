import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class Todo extends React.Component {
  render() {
    const { items } = this.props;

    let output = null;

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

      output = (
        <>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-list" /> Todo
              </h2>
            </div>
            <div className="col-md-6" />
          </div>
          <div className="row">{todoItemsOutput}</div>
        </>
      );
    } else {
      output = <h1>Loading</h1>;
    }

    return output;
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
