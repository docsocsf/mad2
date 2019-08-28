import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import FresherSurveyComponent from '../Survey/FresherSurveyComponent';

class StudentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ fontFamily: 'Georgia' }}>
        <h1
          style={{
            textAlign: 'center',
            fontFamily: 'Open Sans',
          }}
        >
          Student survey
        </h1>
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

export default StudentPage;
