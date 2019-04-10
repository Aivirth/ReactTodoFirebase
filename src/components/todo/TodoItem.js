import React from "react";

export default function TodoItem(props) {
  const { title, content, createdAt, isCompleted } = props;

  return (
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
        <div className="card-body d-flex align-items-stretch">
          <a href="#!" className="btn btn-primary btn-block m-auto">
            Full Edit
          </a>
          <a href="#!" className="btn btn-warning btn-block m-auto">
            Quick Edit
          </a>
          <a href="#!" className="btn btn-danger btn-block m-auto">
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
