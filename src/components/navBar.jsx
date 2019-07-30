import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SurveyComponent from "./surveyComponent";
import Parent from "./parent";
import Student from "./student";

import { Navbar, Nav, Row, Col, Container } from "reactstrap";

class NavBar extends Component {
  render() {
    return (
      <Router>
        <Navbar
          color="dark"
          dark
          style={{
            fontFamily: "Georgia, serif",
            textAlign: "center",
            padding: "0px"
          }}
        >
          <Container style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <Row>
              <Col xs="3" md="auto">
                <Link
                  style={{
                    color: "white",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    paddingTop: "20px"
                  }}
                  class="nav-link"
                  to="/"
                >
                  Parent <span class="sr-only">(current)</span>
                </Link>
              </Col>
              <Col xs="3" md="auto">
                <Link
                  style={{
                    color: "white",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    paddingTop: "20px"
                  }}
                  class="nav-link"
                  to="/Submit-Page"
                >
                  Submit Notice <span class="sr-only">(current)</span>
                </Link>
              </Col>
              <Col xs="3" md="auto">
                <Link
                  style={{
                    color: "white",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    paddingTop: "20px"
                  }}
                  class="nav-link"
                  to="/Lost-and-Found"
                >
                  Student
                </Link>
              </Col>
              {/* <Col xs="3" md="auto">
                <Link
                  style={{
                    color: "white",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    paddingTop: "20px"
                  }}
                  class="nav-link"
                  to="/Map"
                >
                  Admin
                </Link>
              </Col> */}
            </Row>
          </Container>
          <Nav className="ml-auto" navbar />
        </Navbar>

        <Route exact path="/survey" component={SurveyComponent} />
        <Route exact path="/parent" component={Parent} />
        <Route exact path="/student" component={Student} />
      </Router>
    );
  }
}

export default NavBar;
