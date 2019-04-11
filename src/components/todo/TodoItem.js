import React from "react";

export default function TodoItem(props) {
  const { title, content, createdAt, isCompleted } = props;

  const status = isCompleted ? (
    <span className="badge badge-success d-block ml-auto">Completed</span>
  ) : (
    <span className="badge badge-secondary d-block ml-auto">Not Completed</span>
  );

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
          <a href="#!" className="btn btn-primary btn-block btn-sm">
            Edit
          </a>
          <a href="#!" className="btn btn-danger btn-block btn-sm">
            Delete
          </a>
        </div>
        <div className="card-footer text-muted text-center">
          {createdAt.toDate().toString()}
        </div>
      </div>
    </div>
  );
}
