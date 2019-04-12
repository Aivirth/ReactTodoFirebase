import React from "react";

export default function Alert(props) {
  const { type, message } = props;

  let alertClass = "";

  switch (type) {
    case "error":
      alertClass = "danger";
      break;

    case "warning":
      alertClass = "warning";
      break;

    case "success":
      alertClass = "success";
      break;

    default:
      alertClass = "info";
  }

  return (
    <div class={`alert alert-${alertClass}`} role="alert">
      {message}
    </div>
  );
}
