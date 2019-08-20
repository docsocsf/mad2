import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  Button, FormGroup, Label, Input,
} from 'reactstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      await axios.post('/api/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        });

      const response = await axios.get('/api/me', {
        withCredentials: true,
      });

      localStorage.expiry = response.data.exp;

      this.props.loginSuccess();
    } catch (err) {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <>
        { error && (<h3>Login unsuccessful, please try again</h3>)}

        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <Label>Username/Shortcode</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="e.g. ab1219"
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loginSuccess: PropTypes.func,
};
