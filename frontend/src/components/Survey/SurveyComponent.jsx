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
      shortcode: "",
      name: ""
    };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleShortcodeChange = this.handleShortcodeChange.bind(this);
  }

  async onCompleteComponent(results) {
    this.setState({ isCompleted: true });
    let response = await axios.post("http://localhost:8080/api/signup/fresher", 
      this.serializeResults(results.data));
    console.log(response);
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

  handleNameChange(event) {
    this.setState({ name: event.target.value });
    console.log(this.state);
  }

  handleShortcodeChange(event) {
    this.setState({ shortcode: event.target.value });
    console.log(this.state);
  }

  render() {
    var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
    defaultThemeColors["$main-color"] = "#225590";
    defaultThemeColors["$main-hover-color"] = "#2255f9";
    defaultThemeColors["$text-color"] = "#4a4a4a";
    defaultThemeColors["$header-color"] = "#225590";

    defaultThemeColors["$header-background-color"] = "#4a4a4a";
    defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

    Survey.StylesManager.applyTheme();

    return (
      <div>
        <Survey.Survey
          json={config}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
        />
      </div>
    );
  }
}

export default SurveyComponent;
