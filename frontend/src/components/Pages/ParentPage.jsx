import React, { Component } from "react";
import { Col, Container, Row, Alert } from "reactstrap";
import ParentSurveyComponent from "../Survey/ParentSurveyComponent";
import Login from "../Auth/Login";
import Proposals from "../Parents/Proposals";
import axios from "axios";

import isLoggedIn from "../Auth/utils";

class ParentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      loggedIn: isLoggedIn(),
      signedUp: false,
      to: [],
      from: [],
      accepted: false,
      marriage: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  componentDidMount() {
    this.getStatus();
  }

  getStatus() {
    if (this.state.loggedIn) {
      axios
        .get("/api/signup/parent/status", {
          withCredentials: true
        })
        .then(data => {
          this.setState({ to: data.data.to });
          this.setState({ from: data.data.from });
          this.setState({ signedUp: data.data.signedUp });
          var marriage = data.data.to
            .filter(prop => prop.accepted)
            .concat(data.data.from.filter(prop => prop.accepted));
          this.setState({ accepted: marriage.length > 0 });
          if (marriage.length > 0) {
            this.setState({ marriage: marriage[0] });
          }
          this.setState({ ready: true });
        });
    }
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
    this.getStatus();
  }

  render() {
    const {
      loggedIn,
      signedUp,
      to,
      from,
      ready,
      accepted,
      marriage
    } = this.state;
    const getStatus = this.getStatus;
    return (
      <div style={{ fontFamily: "Montserrat" }}>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              {ready &&
                loggedIn &&
                signedUp &&
                accepted &&
                marriage.proposeeId &&
                marriage.proposerId && (
                  <Alert style={{ marginTop: "10px" }}>
                    {marriage.proposeeId.student.firstName} and{" "}
                    {marriage.proposerId.student.firstName}, you are now
                    married! Return to this page soon to see more information
                    about your kids
                  </Alert>
                )}
              {ready && loggedIn && signedUp && !accepted && (
                <Proposals to={to} from={from} getStatus={getStatus} />
              )}
              {ready && loggedIn && !signedUp && (
                <ParentSurveyComponent getStatus={getStatus} />
              )}
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
