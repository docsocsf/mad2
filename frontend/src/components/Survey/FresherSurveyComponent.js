import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import axios from 'axios';
import { config, hobbies } from './FresherSurveyConfig';

class SurveyComponent extends Component {
  constructor(props) {
    super(props);

    const defaultThemeColors = Survey.StylesManager.ThemeColors.default;
    defaultThemeColors['$main-color'] = '#225590';
    defaultThemeColors['$main-hover-color'] = '#2255f9';
    defaultThemeColors['$text-color'] = '#4a4a4a';
    defaultThemeColors['$header-color'] = '#225590';

    defaultThemeColors['$header-background-color'] = '#4a4a4a';
    defaultThemeColors['$body-container-background-color'] = '#f8f8f8';

    Survey.StylesManager.applyTheme();
    this.state = {
      isCompleted: false,
      submissionSuccess: false,
    };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  async onCompleteComponent(results) {
    this.setState({ isCompleted: true });
    const response = await axios.post('/api/signup/fresher',
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
    student.socialMedia = results.socialMedia ? results.socialMedia.trim() : null;

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
      selfDescription: results.selfDescription ? results.selfDescription.trim() : null,
    };
  }

  render() {
    return (
      <>
        { !this.state.isCompleted
          && (
          <Survey.Survey
            json={config}
            showCompletedPage={false}
            onComplete={this.onCompleteComponent}
          />
          )}

        {
          this.state.isCompleted && this.state.submissionSuccess
            && (
            <h1>
              Submission success!
            </h1>
            )
        }

        {
          this.state.isCompleted && !this.state.submissionSuccess
            && (
            <h1>
              Submission Servey error, please try again later
            </h1>
            )
        }
      </>
    );
  }
}

export default SurveyComponent;
