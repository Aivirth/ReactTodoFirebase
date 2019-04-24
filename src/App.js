import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddItem from "./components/todo/AddItem";
import EditItem from "./components/todo/EditItem";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route
                path="/"
                exact
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                path="/add"
                exact
                component={UserIsAuthenticated(AddItem)}
              />
              <Route
                path="/edit/:id"
                exact
                component={UserIsAuthenticated(EditItem)}
              />
              <Route
                path="/login"
                exact
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                path="/register"
                exact
                component={UserIsNotAuthenticated(Register)}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
