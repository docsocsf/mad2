import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import FresherSurveyComponent from "../Survey/FresherSurveyComponent";

class FresherPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              <FresherSurveyComponent />
            </Col>
            <Col sm={1} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default FresherPage;
