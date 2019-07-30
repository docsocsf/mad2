import React, { Component } from "react";
import SurveyComponent from "./surveyComponent";
class Student extends Component {
  render() {
    return (
      <div>
        <h1> Student</h1>
        <SurveyComponent />
      </div>
    );
  }
}

export default Student;
