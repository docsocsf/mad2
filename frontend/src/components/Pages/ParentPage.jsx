import React, { Component } from "react";
import { Col, Container, Row, Card } from "reactstrap";
import ParentSurveyComponent from "../Survey/ParentSurveyComponent";
import Login from "../Auth/Login";

import isLoggedIn from "../Auth/utils";

class ParentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: isLoggedIn()
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  checkLogin() {
    this.setState({
      loggedIn: isLoggedIn()
    });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div style={{ fontFamily: "Montserrat" }}>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              {loggedIn && <ParentSurveyComponent />}
              {!loggedIn && <Login loginSuccess={this.checkLogin} />}
            </Col>
            <Col sm={1} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default ParentPage;
