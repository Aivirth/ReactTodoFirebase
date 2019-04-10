import React from "react";
import TodoItem from "./TodoItem";

export default function Todo() {
  const items = [
    {
      title: "todoTitle",
      content: "todoContent",
      createdAt: "November 9, 2011 at 11:10:50 AM UTC+1",
      isCompleted: false
    }
  ];

  const todoItemsOutput = items.map(item => (
    <TodoItem
      title={item.title}
      content={item.content}
      createdAt={item.createdAt}
      isCompleted={item.isCompleted}
      key={item.title}
    />
  ));

  let output = null;

  if (items) {
    output = (
      <>
        <div className="row">
          <div className="col-md-6">
            <h2>
              <i className="fas fa-list" /> Todo
            </h2>
          </div>
          <div className="col-md-6" />
        </div>
        <div className="row">{todoItemsOutput}</div>
      </>
    );
  } else {
    output = <h1>Loading</h1>;
  }

  return output;
}
