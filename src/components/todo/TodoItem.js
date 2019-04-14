import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firestore } from "firebase";
const TodoItem = props => {
  const { title, content, dueDate, isCompleted, id } = props;

  const status = isCompleted ? (
    <span className="badge badge-success d-block ml-auto">Completed</span>
  ) : (
    <span className="badge badge-secondary d-block ml-auto">Not Completed</span>
  );

  const onDeleteClick = e => {
    e.preventDefault();
    const { id, firestore } = props;

    firestore
      .delete({ collection: "items", doc: id })
      .catch(err => console.log(err))
      .then(console.log("success"));
  };

  return (
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center">
          <h5 className="m-0">{title}</h5>
          {status}
        </div>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
        <div className="card-body">
          <a href="#!" className="btn btn-success btn-block btn-sm">
            Complete
          </a>
          <Link
            href={`/edit/${id}`}
            className="btn btn-primary btn-block btn-sm"
          >
            Edit
          </Link>
          <button
            onClick={onDeleteClick}
            className="btn btn-danger btn-block btn-sm"
          >
            Delete
          </button>
        </div>
        <div className="card-footer text-muted text-center">
          {dueDate.toDate().toString()}
        </div>
      </div>
    </div>
  );
};

export default firestoreConnect()(TodoItem);
