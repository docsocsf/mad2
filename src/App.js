import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <SurveyComponent />
      </div>
    );

  }
}

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
      questions: [
        {
          type: "checkbox",
          name: "car",
          title: "What car are you driving?",
          isRequired: true,
          hasSelectAll: true,
          hasNone: true,
          noneText: "None of the above",
          colCount: 4,
          choicesOrder: "asc",
          choices: [
            "Ford",
            "Tesla",
            "Vauxhall",
            "Volkswagen",
            "Nissan",
            "Audi",
            "Mercedes-Benz",
            "BMW",
            "Peugeot",
            "Toyota",
            "Citroen"
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

export default App;
