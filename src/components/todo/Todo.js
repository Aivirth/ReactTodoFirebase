import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from "../Spinner/Spinner";
import * as actions from "../../redux/actions/index";

class Todo extends React.Component {
  state = {
    totalCompleted: 0,
    totalItems: 0,
    items: []
  };

  static getDerivedStateFromProps(props, state) {
    const { items, authorId } = props;

    if (items) {
      const filteredItems = items.filter(item => item.authorId === authorId);

      const totalItems = filteredItems.length;
      const totalCompleted = filteredItems.filter(item => item.isCompleted)
        .length;

      return {
        totalCompleted,
        totalItems,
        items: filteredItems
      };
    }

    return null;
  }

  render() {
    const { items } = this.state;
    const { totalCompleted, totalItems } = this.state;

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
          dueDate={item.dueDate}
          isCompleted={item.isCompleted}
          id={item.id}
          key={item.id}
          authorId={item.authorId}
        />
      ));

      output = <div className="row">{todoItemsOutput}</div>;
    }

    return (
      <>
        <h2 className="mb-3 d-flex">
          <span className="d-block">
            <i className="fas fa-list" /> Todo
          </span>
          <span className="badge badge-primary d-block ml-auto">
            Completed : {totalCompleted} / {totalItems}
          </span>
        </h2>

        {output}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.firestore.ordered.items,
    authorId: state.firebase.auth.uid
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "items" }])
)(Todo);
