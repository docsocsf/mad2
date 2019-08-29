import React, { Component } from 'react';
import axios from 'axios';
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  FormGroup,
  Col,
  Row,
  Label,
} from 'reactstrap';

class Proposals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({
      error: false,
      errorMessage: '',
    });
    const username = event.target.username.value;
    if (username === '') {
      this.setState({
        error: true,
        errorMessage: 'Shortcode cannot be empty',
      });
    } else {
      try {
        await axios.post(
          '/api/signup/parent/propose',
          {
            partnerShortcode: username,
          },
          {
            withCredentials: true,
          },
        );
        this.props.getStatus();
      } catch (err) {
        this.setState({ error: true });
        let errorMessage;
        if (err.response) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = 'Server is down right now, please try again later';
        }
        this.setState({ errorMessage });
      }
    }
  }

  async propose(username) {
    await axios.post(
      '/api/signup/parent/propose',
      {
        partnerShortcode: username,
      },
      {
        withCredentials: true,
      },
    );
    window.setTimeout(() => {
      this.props.getStatus();
    }, 500);
  }

  render() {
    const { to } = this.props;
    const { from } = this.props;
    const { error } = this.state;
    const { errorMessage } = this.state;
    return (
      <div>
        {to.length > 0 && (
          <Card style={{ marginTop: '10px' }}>
            <CardHeader tag="h3">People that proposed to you</CardHeader>
            <CardBody>
              {to.map((value) => (
                <Alert color="primary" key={value.proposeTs}>
                  <Row>
                    <Col sm={9}>
                      {value.proposerId.student.firstName}
                      {' '}
                      {value.proposerId.student.lastName}
                      {', '}
                      {value.proposerId.student.shortcode}
                    </Col>
                    <Col sm={3}>
                      <Button
                        block
                        outline
                        color="primary"
                        onClick={() => this.propose(value.proposerId.student.shortcode)}
                      >
                          Accept Proposal
                      </Button>
                    </Col>
                  </Row>
                </Alert>
              ))}
            </CardBody>
          </Card>
        )}
        {from.length > 0 && (
          <Card style={{ marginTop: '10px' }}>
            <CardHeader tag="h3">People you Proposed to</CardHeader>
            <CardBody>
              {from.map((value) => (
                <Alert color="primary" key={value.proposeTs}>
                  {value.proposeeId.student.firstName}
                  {' '}
                  {value.proposeeId.student.lastName}
                  {', '}
                  {value.proposeeId.student.shortcode}
                </Alert>
              ))}
            </CardBody>
          </Card>
        )}
        <Card style={{ marginTop: '10px' }}>
          <CardHeader tag="h3">Propose to someone</CardHeader>
          <CardBody>
            {error && <Alert color="danger">{errorMessage}</Alert>}
            <form onSubmit={this.handleSubmit}>
              <FormGroup row controlid="email" style={{ paddingTop: '10px' }}>
                <Col>
                  <Label>Shortcode of partner</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="e.g. ab1219"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={3} />
                <Col sm={{ size: 6 }}>
                  <div className="text-center">
                    <Button type="submit">Submit</Button>
                  </div>
                </Col>
                <Col sm={3} />
              </FormGroup>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Proposals;
