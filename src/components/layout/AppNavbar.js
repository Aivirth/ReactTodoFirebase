import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { signOut } from "../../redux/actions/index";

const AppNavbar = props => {
  const authID = props.auth.uid;
  const userEmail = props.auth.email;

  const onLogoutClick = e => {
    e.preventDefault();
    props.signOut();
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          ReactTodo
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mr-auto">
            {authID ? (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav ml-auto">
            {authID ? (
              <>
                <li className="nav-item">
                  <a
                    href="#!"
                    className="nav-link"
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    {userEmail}
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#!" className="nav-link" onClick={onLogoutClick}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// AppNavbar.propTypes = {
//   firebase: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => {
  return {
    firebase: state.firebase,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavbar);
