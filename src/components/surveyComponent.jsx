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
            }
          ]
        },
        {
          questions: [
            {
              type: "radiogroup",
              name: "price to competitors",
              title: "Compared to our competitors, do you feel the Product is",
              choices: [
                "Less expensive",
                "Priced about the same",
                "More expensive",
                "Not sure"
              ]
            },
            {
              type: "radiogroup",
              name: "price",
              title: "Do you feel our current price is merited by our product?",
              choices: [
                "correct|Yes, the price is about right",
                "low|No, the price is too low for your product",
                "high|No, the price is too high for your product"
              ]
            },
            {
              type: "multipletext",
              name: "pricelimit",
              title: "What is the... ",
              items: [
                {
                  name: "mostamount",
                  title:
                    "Most amount you would every pay for a product like ours"
                },
                {
                  name: "leastamount",
                  title: "The least amount you would feel comfortable paying"
                }
              ]
            }
          ]
        },
        {
          questions: [
            {
              type: "text",
              name: "email",
              title:
                "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you wish to participate in our drawing, then press the 'Submit' button."
            }
          ]
        }
      ]
    };
    //   pages: [
    //     {
    //       name: "page1",
    //       elements: [
    //         {
    //           type: "rating",
    //           name: "question1",
    //           title: "How much do you enjoy drinking?",
    //           isRequired: true
    //         },
    //         {
    //           type: "rating",
    //           name: "question2",
    //           title: "How much do you enjoy drinking?",
    //           isRequired: true
    //         },
    //         {
    //           type: "rating",
    //           name: "question3",
    //           title: "How much do you enjoy drinking?",
    //           isRequired: true
    //         },
    //         {
    //           type: "rating",
    //           name: "question4",
    //           title: "How much do you enjoy drinking?",
    //           isRequired: true
    //         },
    //         {
    //           type: "rating",
    //           name: "question5",
    //           title: "How much do you enjoy drinking?",
    //           isRequired: true
    //         },
    //         {
    //           type: "rating",
    //           name: "question6",
    //           title: "How much do you enjoy drinking?",
    //           isRequired: true
    //         }
    //       ]
    //     }
    //   ]
    // };

    var survey = new Survey.Model(json);
    // survey.onComplete.add(function(result) {
    //   document.querySelector("#surveyResult").textContent =
    //     "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    // });
    var onCompleteComponent = this.state.isCompleted ? <div /> : null;

    survey.onComplete.add(function(result) {
      document.querySelector("#surveyResult").textContent =
        "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

    return (
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
          model={survey}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
        />
        {onCompleteComponent}
      </div>
    );
  }
}

export default SurveyComponent;
