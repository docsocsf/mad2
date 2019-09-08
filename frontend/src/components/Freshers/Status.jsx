import React, { Component } from "react";
import axios from "axios";
import Family from "../Pages/Family";
import { Col, Container, Row, Card, CardTitle, CardBody } from "reactstrap";

export default class Status extends Component {
  constructor({ props, match }) {
    super(props);
    this.state = {
      match: match.params.id,
      parent1: {},
      parent2: {},
      kids: [],
      ready: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit() {
    axios.get("/api/signup/fresher/verify?id=" + this.state.match).then(() => {
      axios
        .get("/api/signup/fresher/status?id=" + this.state.match, {
          withCredentials: true
        })
        .then(data => {
          const status = data.data;
          this.setState({
            parent1: status.me.family.parents.proposerId,
            parent2: status.me.family.parents.proposeeId,
            kids: status.me.family.kids,
            ready: true
          });
        });
    });
  }

  render() {
    const { kids, parent1, parent2, ready } = this.state;
    return (
      <>
        {ready && <Family kids={kids} parent1={parent1} parent2={parent2} />}
        {!ready && (
          <Container>
            <Row>
              <Col xs={0} md={2} />
              <Col xs={12} md={8}>
                <Card style={{ marginTop: "10px" }}>
                  <CardBody>
                    <CardTitle style={{ textAlign: "center" }}>
                      <h2>Failed</h2>
                      <p>Make sure you used the exact link (try again)</p>
                    </CardTitle>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}
