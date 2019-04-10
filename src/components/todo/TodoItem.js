import React from "react";

export default function TodoItem(props) {
  const { title, content, createdAt, isCompleted } = props;
  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
        <div className="card-body">
          <a href="#!" className="btn btn-primary btn-block">
            Edit
          </a>
          <a href="#!" className="btn btn-danger btn-block">
            Delete
          </a>
        </div>
        <div className="card-footer text-muted text-center">{createdAt}</div>
      </div>
    </div>
  );
}
