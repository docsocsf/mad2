import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

import { Button, FormGroup, Label, Input, Col, Card } from "reactstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    this.setState({ loading: true });
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      await axios.post(
        "/api/login",
        {
          username,
          password
        },
        {
          withCredentials: true
        }
      );

      const response = await axios.get("/api/me", {
        withCredentials: true
      });
      localStorage.expiry = response.data.exp;
      localStorage.firstName = response.data.data.FirstName;
      localStorage.lastName = response.data.data.Surname;
      localStorage.shortcode = response.data.data.Login;
      this.props.loginSuccess();
      this.setState({ loading: false });
    } catch (err) {
      this.setState({
        error: true
      });
      this.setState({ loading: false });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <>
        {error && (
          <h3 className="text-center">Login unsuccessful, please try again</h3>
        )}

        <div className="Login">
          <Card style={{ marginTop: "10px" }}>
            <h1
              style={{
                textAlign: "center"
              }}
            >
              Parent Signup
            </h1>
            <form onSubmit={this.handleSubmit}>
              <FormGroup row controlid="email" style={{ paddingTop: "10px" }}>
                <Col sm={3} />

                <Col sm={6}>
                  <Label>Username/Shortcode</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="e.g. ab1219"
                  />
                </Col>
                <Col sm={3} />
              </FormGroup>
              <FormGroup row controlid="password">
                <Col sm={3} />
                <Col sm={6}>
                  <Label>Password</Label>
                  <Input type="password" name="password" id="password" />
                </Col>
                <Col sm={3} />
              </FormGroup>
              <FormGroup row>
                <Col sm={3} />
                <Col sm={{ size: 6 }}>
                  <div className="text-center">
                    {!this.state.loading && (
                      <Button type="submit">Login</Button>
                    )}
                    {this.state.loading && (
                      <ScaleLoader color={"#225590"}></ScaleLoader>
                    )}
                  </div>
                </Col>
                <Col sm={3} />
              </FormGroup>
            </form>
          </Card>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loginSuccess: PropTypes.func
};
