import React from "react";
import PropTypes from "prop-types";

// import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

import firebase from "firebase";
import { firebaseConnect, withFirebase } from "react-redux-firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isSignup: false
  };

  componentDidMount() {
    if (this.props.authRedirectPath === "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  toggleSignUpStatus = e => {
    e.preventDefault();

    this.setState({ isSignup: !this.state.isSignup });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    this.props.onAuth(
      this.state.email,
      this.state.password,
      this.state.isSignup
    );
  };

  render() {
    const { email, password, isSignup } = this.state;

    const isSignuUpButton = (
      <button
        onClick={this.toggleSignUpStatus}
        className={`btn btn-${isSignup ? "success" : "secondary"} `}
      >
        {isSignup ? "yes" : "no"}
      </button>
    );
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Login
                </span>
              </h1>
              <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={email}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={password}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="isSignup">Already Registered? </label>
                  {isSignuUpButton}
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Login.propTypes = {
//   firebase: PropTypes.object.isRequired
// };

// export default withFirebase(Login);

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
