import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";

class SurveyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  onCompleteComponent() {
    this.setState({ isCompleted: true });
  }

  render() {
    let json = {
      pages: [
        {
          name: "page1",
          elements: [
            {
              type: "rating",
              name: "question1",
              title: "How much do you enjoy drinking?",
              isRequired: true
            },
            {
              type: "rating",
              name: "question2",
              title: "How much do you enjoy drinking?",
              isRequired: true
            },
            {
              type: "rating",
              name: "question3",
              title: "How much do you enjoy drinking?",
              isRequired: true
            },
            {
              type: "rating",
              name: "question4",
              title: "How much do you enjoy drinking?",
              isRequired: true
            },
            {
              type: "rating",
              name: "question5",
              title: "How much do you enjoy drinking?",
              isRequired: true
            },
            {
              type: "rating",
              name: "question6",
              title: "How much do you enjoy drinking?",
              isRequired: true
            }
          ]
        }
      ]
    };

    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        json={json}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
      />
    ) : null;

    var onCompleteComponent = this.state.isCompleted ? (
      <div>The component after onComplete event</div>
    ) : null;
    return (
      <div>
        {surveyRender}
        {onCompleteComponent}
      </div>
    );
  }
}

export default SurveyComponent;
