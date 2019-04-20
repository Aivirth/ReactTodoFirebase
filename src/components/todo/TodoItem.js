import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
const TodoItem = props => {
  const { title, content, dueDate, id } = props;
  let [isCompleted, setIsCompleted] = useState(props.isCompleted);

  const onCompletedUpdateClick = e => {
    e.preventDefault();
    const { id, firestore } = props;

    setIsCompleted((isCompleted = !isCompleted));

    firestore
      .collection("items")
      .doc(id)
      .update({ isCompleted: isCompleted })
      .catch(err => console.log(err))
      .then(console.log("success"));
  };

  const onDeleteClick = e => {
    e.preventDefault();
    const { id, firestore } = props;

    firestore
      .delete({ collection: "items", doc: id })
      .catch(err => console.log(err))
      .then(console.log("success"));
  };

  const status = isCompleted ? (
    <span className="badge badge-success d-block ml-auto">Completed</span>
  ) : (
    <span className="badge badge-secondary d-block ml-auto">Not Completed</span>
  );

  const statusSwitchBtn = (
    <button
      onClick={onCompletedUpdateClick}
      className={`btn btn-block btn-sm btn-${
        isCompleted ? "secondary" : "success"
      }`}
    >
      {isCompleted ? "Cancel" : "Complete"}
    </button>
  );

  return (
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center">
          <h5 className="m-0">{title}</h5>
          {status}
        </div>

        <div className="card-body">
          <p className="mb-0">User : </p>
          <hr />
          <p className="card-text">{content}</p>
        </div>
        <div className="card-body">
          {statusSwitchBtn}
          <Link to={`/edit/${id}`} className="btn btn-primary btn-block btn-sm">
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
