import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavigationBar from "./components/Navigation/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ParentPage from "./components/Pages/ParentPage";
import FresherPage from "./components/Pages/FresherPage";
import HomePage from "./components/Pages/HomePage";
import Validate from "./components/Freshers/Validate";
import Status from "./components/Freshers/Status";
import "./global.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavigationBar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/parent" component={ParentPage} />
        <Route exact path="/fresher" component={FresherPage} />
        <Route exact path="/fresher/verify/:id" component={Validate} />
        <Route exact path="/fresher/status/:id" component={Status} />
      </Router>
    );
  }
}
