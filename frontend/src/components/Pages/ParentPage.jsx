import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import ParentSurveyComponent from "../Survey/ParentSurveyComponent";
import Login from "../Auth/Login";
import Proposals from "../Parents/Proposals";
import Family from "./Family";

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
      parent1: {},
      parent2: {},
      kids: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  componentDidMount() {
    this.getStatus();
  }

  getStatus() {
    const { loggedIn } = this.state;

    if (loggedIn) {
      axios
        .get("/api/signup/parent/status", {
          withCredentials: true
        })
        .then(data => {
          const status = data.data;
          this.setState({
            to: status.proposals.to,
            from: status.proposals.from,
            signedUp: status.signedUp
          });
          if (status.me && status.me.family) {
            this.setState({
              accepted: true,
              parent1: status.me.family.parents.proposerId,
              parent2: status.me.family.parents.proposeeId,
              kids: status.me.family.kids
            });
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
      kids,
      parent1,
      parent2
    } = this.state;
    const { getStatus } = this;
    return (
      <div>
        <Container>
          <Row>
            <Col sm={1} />
            <Col sm={10}>
              {ready && loggedIn && signedUp && accepted && (
                <Family kids={kids} parent1={parent1} parent2={parent2} />
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
