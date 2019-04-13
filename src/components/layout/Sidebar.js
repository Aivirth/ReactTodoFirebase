import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Link to="/add" className="btn btn-success btn-block">
      <i className="fa fa-plus" /> New
    </Link>
  );
}
