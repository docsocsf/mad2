import React, { Component } from "react";
import axios from "axios";

class Proposals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/signup/proposals", {
        withCredentials: true
      })
      .then(data => console.log(data.data));
  }

  render() {
    return <div></div>;
  }
}

export default Proposals;
