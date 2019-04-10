import React from "react";
import Todo from "../todo/Todo";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-md-10">
          <h1>List</h1>
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
        <Todo />
      </div>
    </div>
  );
}
