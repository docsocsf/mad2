import React, { Component } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import { Col, Container, Row, Card, CardTitle, CardBody } from "reactstrap";

export default class Validate extends Component {
  constructor({ props, match }) {
    super(props);
    this.state = {
      loading: true,
      response: "",
      match: match.params.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit() {
    axios
      .get("/api/signup/fresher/verify?id=" + this.state.match)
      .then(() => {
        this.setState({ response: "Success" });
      })
      .catch(() => {
        this.setState({ response: "Failed" });
      });
    this.setState({ loading: false });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={0} md={2} />
          <Col xs={12} md={8}>
            <Card style={{ marginTop: "10px" }}>
              <CardBody>
                <CardTitle style={{ textAlign: "center" }}>
                  <h1>Validate</h1>
                  <h2>{this.state.response}</h2>
                  {this.state.response === "Failed" && (
                    <p>Make sure you used the exact link (try again)</p>
                  )}
                  {this.state.loading && (
                    <ScaleLoader color={"#225590"}></ScaleLoader>
                  )}
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
