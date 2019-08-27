import React, { Component } from "react";
import axios from "axios";
import { Alert, Card, CardBody, CardTitle } from "reactstrap";

class Proposals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: [],
      to: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/signup/proposals", {
        withCredentials: true
      })
      .then(data => {
        console.log(data.data);
        this.setState({ from: data.data.from });
        this.setState({ to: data.data.to });
      });
  }

  render() {
    const to = this.state.to;
    const from = this.state.from;
    console.log(to, from);
    return (
      <div>
        {to.length > 0 && (
          <Card style={{ marginTop: "10px" }}>
            <CardBody>
              <CardTitle>People that proposed to you</CardTitle>
              {to.map(value => {
                return (
                  <Alert color={"primary"} key={value.proposeTs}>
                    {value.proposerName}
                  </Alert>
                );
              })}
            </CardBody>
          </Card>
        )}
        {from.length > 0 && (
          <Card style={{ marginTop: "10px" }}>
            <CardBody>
              <CardTitle>People you Proposed to</CardTitle>
              {from.map(value => {
                return (
                  <Alert color={"primary"} key={value.proposeTs}>
                    {value.proposeeShortcode}
                  </Alert>
                );
              })}
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

export default Proposals;
