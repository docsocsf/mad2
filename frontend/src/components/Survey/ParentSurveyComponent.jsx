import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import axios from "axios";
import { Card } from "reactstrap";
import ScaleLoader from "react-spinners/ScaleLoader";
import { config, hobbies } from "./ParentSurveyConfig.js";

class ParentSurveyComponent extends Component {
  constructor(props) {
    super(props);

    const defaultThemeColors = Survey.StylesManager.ThemeColors.default;
    defaultThemeColors["$main-color"] = "#225590";
    defaultThemeColors["$main-hover-color"] = "#2255f9";
    defaultThemeColors["$text-color"] = "#4a4a4a";
    defaultThemeColors["$header-color"] = "#225590";

    defaultThemeColors["$header-background-color"] = "#4a4a4a";
    defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

    Survey.StylesManager.applyTheme();

    this.state = {
      isCompleted: false,
      submissionSuccess: false
    };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  async onCompleteComponent(results) {
    this.setState({ isCompleted: true });
    const response = await axios.post(
      "/api/signup/parent",
      this.serializeResults(results.data)
    );
    if (response.status === 201) {
      this.setState({
        submissionSuccess: true
      });
      window.setTimeout(() => {
        this.props.getStatus();
      }, 4000);
    }
  }

  serializeResults(results) {
    const student = {};
    student.firstName = localStorage.firstName;
    student.lastName = localStorage.lastName;
    student.preferredName =
      results.preferredName != null
        ? results.preferredName.trim()
        : localStorage.firstName;
    student.gender = results.gender;
    student.course = results.course;
    student.shortcode = localStorage.shortcode;
    student.socialMedia = results.socialMedia
      ? results.socialMedia.trim()
      : null;

    const interestsOutput = {};

    for (const hobby of hobbies) {
      let score;
      if (results.interests) {
        score = results.interests[hobby];
      } else {
        score = 0;
      }
      interestsOutput[hobby] = score !== undefined ? Number(score) : 0;
    }

    return {
      student,
      interests: interestsOutput,
      selfDescription: results.selfDescription
        ? results.selfDescription.trim()
        : null
    };
  }

  render() {
    return (
      <>
        {!this.state.isCompleted && (
          <Card style={{ marginTop: "10px" }}>
            <div>
              <h1
                style={{
                  textAlign: "center"
                }}
              >
                Parent Signup
              </h1>
              <Survey.Survey
                json={config}
                showCompletedPage={false}
                onComplete={this.onCompleteComponent}
              />
            </div>
          </Card>
        )}

        {this.state.isCompleted && this.state.submissionSuccess && (
          <div
            style={{
              textAlign: "center"
            }}
          >
            <h1>Submission success!</h1>
            <br />
            Thank you for signing up as a parent
            <ScaleLoader color="#225590" />
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
