import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../redux/actions/index";

const Register = props => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    nickname: ""
  });

  const onInputChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onFormSubmit = e => {
    e.preventDefault();
    props.register(user);
  };

  const { authError } = props;

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="alert alert-danger" role="alert">
          <h5>Disclaimer</h5>
          <p style={{ fontSize: "0.8rem" }}>
            This is a portfolio application not meant to be used in real life
            scenarios, you are invited to <strong>not</strong> use your real
            email or write sensible data.
          </p>
          <p style={{ fontSize: "0.8rem" }}>
            If you want to test the registration procedure you are invited to
            write a fake email or use a service like{" "}
            <a
              href="https://10minutemail.com/10MinuteMail/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              10MinuteMail.com
            </a>
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <h1 className="text-center pb-4 pt-3">
              <span className="text-primary">
                <i className="fas fa-lock" /> Register
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
                <label htmlFor="nickname">Nickname</label>
                <input
                  type="text"
                  className="form-control"
                  name="nickname"
                  required
                  value={user.nickname}
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

            {authError ? (
              <div className="alert alert-danger" role="alert">
                {authError}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    register: creds => dispatch(register(creds))
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
