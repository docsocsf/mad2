import React, { Component } from "react";
import NavBar from "./components/navBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Parent from "./components/parent";
import Student from "./components/student";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Route exact path="/parent" component={Parent} />
        <Route exact path="/student" component={Student} />
      </Router>
    );
  }
}

export default App;
