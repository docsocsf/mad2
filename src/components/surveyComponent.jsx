import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { Form, FormGroup, Label, Input, Container, Col } from "reactstrap";

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

  onCompleteComponent() {
    this.setState({ isCompleted: true });
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
      <div>
        <Container>
          <Form>
            <FormGroup row>
              <Label sm={1}> Name </Label>
              <Col sm={5}>
                <Input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              </Col>
              <Label sm={1}> Shortcode </Label>
              <Col sm={5}>
                <Input
                  name="shortcode"
                  value={this.state.shortcode}
                  onChange={this.handleShortcodeChange}
                />
              </Col>
            </FormGroup>
          </Form>
        </Container>
        <Survey.Survey
          json={json}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
        />
      </div>
    ) : null;

    var onCompleteComponent = this.state.isCompleted ? <div>{}}</div> : null;
    return (
      <div>
        {surveyRender}
        {onCompleteComponent}
      </div>
    );
  }
}

export default SurveyComponent;
