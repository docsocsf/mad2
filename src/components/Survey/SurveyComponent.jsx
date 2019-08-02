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

  onCompleteComponent(results) {
    this.setState({ isCompleted: true });
    axios.post("http://localhost:8080/", 
      this.serializeResults(results.data));
  }

  serializeResults(results) {
    const student = {};
    student.firstName = results.firstName.trim();
    student.lastName = results.lastName.trim();
    student.preferredName = results.preferredName.trim() || null;

    const interestsOutput = {}

    for (let hobby of hobbies) {
      console.log(results);
      const score = results.interests[hobby];
      interestsOutput[hobby] = score !== undefined ? Number(score) : 0
    }

    return {
      student: student,
      interests: interestsOutput,
      selfDescription: results.selfDescription.trim() || null,
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
