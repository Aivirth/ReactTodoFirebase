import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/index";

const AppNavbar = props => {
  const authID = props.auth.uid;

  const { profile } = props;

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
                    {profile.nickname} | {profile.email}
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
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://github.com/Aivirth/ReactTodoFirebase"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    firebase: state.firebase,
    profile: state.firebase.profile,
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
