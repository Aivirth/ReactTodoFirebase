import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";

const TodoItem = props => {
  const { title, content, dueDate, id } = props;
  let [isCompleted, setIsCompleted] = useState(props.isCompleted);
  let [deadLineStatus, setDeadLineStatus] = useState("normal");

  useEffect(() => {
    const deadLineInSeconds = dueDate.seconds;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const differenceInSeconds = deadLineInSeconds - currentTimeInSeconds;
    //48 hours
    const warningLimit = 172800;

    if (differenceInSeconds <= warningLimit && differenceInSeconds >= 0) {
      setDeadLineStatus("warning");
    }

    if (differenceInSeconds < 0) {
      setDeadLineStatus("missed");
    }
  }, []);

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
    <span className="badge badge-success d-inline-block ml-2">Completed</span>
  ) : (
    <span className="badge badge-secondary d-inline-block ml-2">
      Not Completed
    </span>
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

  let deadLineBadge =
    deadLineStatus === "warning" ? (
      <span className="badge badge-warning d-inline-block">Expires Soon</span>
    ) : (
      <span className="badge badge-danger d-inline-block">Expired</span>
    );

  return (
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center">
          <h5 className="m-0">{title}</h5>
          <div className="ml-auto">
            {deadLineStatus !== "normal" ? deadLineBadge : null}
            {status}
          </div>
        </div>

        <div className="card-body">
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
          Deadline: {moment(dueDate.toDate()).calendar()}
        </div>
      </div>
    </div>
  );
};

export default firestoreConnect()(TodoItem);
