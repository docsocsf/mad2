import React, { Component } from "react";
import SurveyComponent from "../surveyComponent";
import { Form, FormGroup, Label, Input, Col, Container } from "reactstrap";

class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Student survey</h1>
        <SurveyComponent />
      </div>
    );
  }
}

export default StudentPage;
