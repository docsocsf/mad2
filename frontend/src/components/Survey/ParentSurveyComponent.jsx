import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { config, hobbies } from "./ParentSurveyConfig.js";
import axios from "axios";

class ParentSurveyComponent extends Component {
  constructor(props) {
    super(props);

    const defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
    defaultThemeColors["$main-color"] = "#225590";
    defaultThemeColors["$main-hover-color"] = "#2255f9";
    defaultThemeColors["$text-color"] = "#4a4a4a";
    defaultThemeColors["$header-color"] = "#225590";

    defaultThemeColors["$header-background-color"] = "#4a4a4a";
    defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

    Survey.StylesManager.applyTheme();

    this.state = {
      isCompleted: false,
      submissionSuccess: false,
      shortcode: '',
      partnerShortcode: '',
      proposalStatus: null
    };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  async onCompleteComponent(results) {
    this.setState({ isCompleted: true });
    let response = await axios.post(
      "/api/signup/parent",
      this.serializeResults(results.data)
    );
    if (response.status === 201) {
      this.setState({
        submissionSuccess: true,
        shortcode: response.data.shortcode,
        type: response.data.status,
        partnerShortcode:  response.data.partnerShortcode
      });
    }
  }

  serializeResults(results) {
    const student = {};
    student.firstName = results.firstName.trim();
    student.lastName = results.lastName.trim();
    student.preferredName = results.preferredName
      ? results.preferredName.trim()
      : null;
    student.shortcode = results.shortcode;

    const interestsOutput = {};

    for (let hobby of hobbies) {
      let score;
      if (results.interests) {
        score = results.interests[hobby];
      } else {
        score = 0;
      }
      interestsOutput[hobby] = score !== undefined ? Number(score) : 0;
    }

    return {
      student: student,
      interests: interestsOutput,
      selfDescription: results.selfDescription
        ? results.selfDescription.trim()
        : null,
      partnerShortcode: results.partnerShortcode
    };
  }

  render() {
    return (
      <>
        {!this.state.isCompleted && (
          <Survey.Survey
            json={config}
            showCompletedPage={false}
            onComplete={this.onCompleteComponent}
          />
        )}

        {this.state.isCompleted && this.state.submissionSuccess && (
          <div style={{
            'text-align': 'center'
          }}>
            <h1>Submission success!</h1>
            <br/>
            Thank you for signing up as a parent, {this.state.shortcode}
          </div>
        )}

        {this.state.isCompleted && !this.state.submissionSuccess && (
          <h1>Submission Survey error, please try again later</h1>
        )}
      </>
    );
  }
}

export default ParentSurveyComponent;
