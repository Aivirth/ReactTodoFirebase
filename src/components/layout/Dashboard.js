import React from "react";
import Todo from "../todo/Todo";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <>
      <div className="row">
        <div className="col-md-10">
          <Todo />
        </div>

        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
