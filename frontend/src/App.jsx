import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavigationBar from "./components/Navigation/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ParentPage from "./components/Pages/ParentPage";
import StudentPage from "./components/Pages/StudentPage";
import HomePage from "./components/Pages/HomePage";
import "./global.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavigationBar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/parent" component={ParentPage} />
        <Route exact path="/student" component={StudentPage} />
      </Router>
    );
  }
}
