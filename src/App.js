import React  from "react";
import NavigationBar from "./components/navigationBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ParentPage from "./components/pages/parentPage";
import StudentPage from "./components/pages/studentPage";
import HomePage from "./components/pages/homePage";

export default function App() {
    return (
      <Router>
        <NavigationBar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/parent" component={ParentPage} />
        <Route exact path="/student" component={StudentPage} />
      </Router>
    );
}
