import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddItem from "./components/todo/AddItem";
import EditItem from "./components/todo/EditItem";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/add" exact component={AddItem} />
                <Route path="/edit/:id" exact component={EditItem} />
                <Route path="/login" exact component={Login} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
