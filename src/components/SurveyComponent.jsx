import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { Form, FormGroup, Label, Input, Container, Col } from "reactstrap";
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
    axios.post("http://localhost:8080/", results.data)
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
    let json = {
      pages: [
        {
          questions: [
            {
              type: "matrix",
              name: "Quality",
              title:
                "Please indicate if you agree or disagree with the following statements",
              columns: [
                {
                  value: 1,
                  text: "Strongly Disagree"
                },
                {
                  value: 2,
                  text: "Disagree"
                },
                {
                  value: 3,
                  text: "Neutral"
                },
                {
                  value: 4,
                  text: "Agree"
                },
                {
                  value: 5,
                  text: "Strongly Agree"
                }
              ],
              rows: [
                {
                  value: "affordable",
                  text: "Product is affordable"
                },
                {
                  value: "does what it claims",
                  text: "Product does what it claims"
                },
                {
                  value: "better then others",
                  text: "Product is better than other products on the market"
                },
                {
                  value: "easy to use",
                  text: "Product is easy to use"
                }
              ]
            },
            {
              type: "text",
              name: "textQuestion",
              title: "Answer this question goddamnit"
            }
          ]
        }
      ]
    };

    return (
      <div>
        <Survey.Survey
          json={json}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
        />
      </div>
    );
  }
}

export default SurveyComponent;
