import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
// import firebase, { auth } from "firebase";

import Spinner from "../Spinner/Spinner";
import * as actions from "../../redux/actions/index";

class Todo extends React.Component {
  state = {
    totalCompleted: 0,
    totalItems: 0
  };

  static getDerivedStateFromProps(props, state) {
    const { items } = props;

    if (items) {
      const totalItems = items.length;
      const totalCompleted = items.filter(item => item.isCompleted).length;

      return {
        totalCompleted,
        totalItems
      };
    }

    return null;
  }

  render() {
    const { items } = this.props;
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
  console.log(state);
  return {
    items: state.firestore.ordered.items
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "items" }])
)(Todo);
