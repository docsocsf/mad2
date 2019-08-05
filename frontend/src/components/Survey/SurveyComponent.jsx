import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { config, hobbies } from "./SurveyConfig.js";
import axios from 'axios';

class SurveyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false,
      submissionSuccess: false,
    };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  async onCompleteComponent(results) {
    this.setState({ isCompleted: true });
    let response = await axios.post("/api/signup/fresher", 
      this.serializeResults(results.data));
    if (response.status === 201) {
      this.setState({ submissionSuccess: true });
    }
  }

  serializeResults(results) {
    const student = {};
    student.firstName = results.firstName.trim();
    student.lastName = results.lastName.trim();
    student.preferredName = results.preferredName ? results.preferredName.trim() : null;
    student.shortcode = results.shortcode;

    const interestsOutput = {};

    for (let hobby of hobbies) {
      const score = results.interests[hobby];
      interestsOutput[hobby] = score !== undefined ? Number(score) : 0
    }

    return {
      student: student,
      interests: interestsOutput,
      selfDescription: results.selfDescription ? results.selfDescription.trim() : null,
    }

  }

  render() {
    return (
      <>
        { !this.state.isCompleted &&
          <Survey.Survey
            json={config}
            showCompletedPage={false}
            onComplete={this.onCompleteComponent}
          />
        }

        {
          this.state.isCompleted && this.state.submissionSuccess &&
            <h1>
              Submission success!
            </h1>
        }
      </>
    );
  }
}

export default SurveyComponent;
