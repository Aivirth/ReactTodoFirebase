import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import firebase from "firebase";
// import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends React.Component {
  state = {
    isAuthenticated: false,
    userEmail: ""
  };

  // static getDerivedStateFromProps(props, state) {
  //   // const user = firebase.auth().currentUser;
  //   // if (user) {
  //   //   return { isAuthenticated: true, userEmail: user.email };
  //   // } else {
  //   //   return { isAuthenticated: false };
  //   // }
  // }

  onLogoutClick = e => {
    e.preventDefault();
    // const { firebase } = this.props;

    // firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
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
                      {this.state.userEmail}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="nav-link"
                      onClick={this.onLogoutClick}
                    >
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
  }
}

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

export default AppNavbar;
