import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import firebase from "firebase";

const AppNavbar = () => {
  const isAuthenticated = true;

  const onLogoutClick = e => {
    e.preventDefault();
    // const { firebase } = this.props;

    // firebase.logout();
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
            {isAuthenticated ? (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {/* {state.userEmail} */}
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

// export default compose(
//   firebaseConnect(),
//   connect((state, props) => ({
//     auth: state.firebase.auth
//   }))
// )(AppNavbar);

const mapStateToProps = state => {
  console.log(state);
  return {
    firebase
  };
};

export default connect(mapStateToProps)(AppNavbar);
