import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ParentSurveyComponent from '../Survey/ParentSurveyComponent';
import Login from '../Auth/Login';

import isLoggedIn from '../Auth/utils';

class ParentPage extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
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
          Parent Signup
        </h1>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              { isLoggedIn() && <ParentSurveyComponent />}
              { !isLoggedIn() && <Login />}
            </Col>
            <Col sm={1} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default ParentPage;
