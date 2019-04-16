import React, { useState } from "react";
import PropTypes from "prop-types";

// import { compose } from "redux";
// import { connect } from "react-redux";

import axios from "axios";
import firebase from "firebase";
import { firebaseConnect, withFirebase } from "react-redux-firebase";

const Login = props => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const onInputChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onFormSubmit = e => {
    e.preventDefault();

    const { email, password } = user;

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC_X4FeystKjgU6HTS_H2V7LMd3GaFkPsg",
        authData
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));

    // firebase
    //   .login({
    //     email,
    //     password
    //   })
    //   .catch(err => console.log("invalid login credentials"))
    //   .then(props.history.push("/"));

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch(error => console.log(error));
  };
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
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  value={user.email}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  value={user.password}
                  onChange={onInputChange}
                />
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
};

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withFirebase(Login);
