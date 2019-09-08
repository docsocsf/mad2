import React, { Component } from "react";
import { Alert, Card, CardBody, CardText, Row, Col } from "reactstrap";

class Family extends Component {
  render() {
    return (
      <>
        <br></br>
        <h1 style={{ textAlign: "center" }}>Your Family</h1>
        <Row>
          <Col>
            <h2>Parents:</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Card>
              <CardBody>
                <CardText>
                  {this.props.parent1.student.preferredName != null &&
                    this.props.parent1.student.preferredName}
                  {this.props.parent1.student.preferredName === null &&
                    this.props.parent1.student.firstName}{" "}
                  {this.props.parent1.student.lastName}
                </CardText>
                {this.props.parent1.selfDescription != null && (
                  <CardText>{this.props.parent1.selfDescription}</CardText>
                )}
                {this.props.parent1.student.socialMedia != null && (
                  <CardText>
                    Social Media: {this.props.parent1.student.socialMedia}
                  </CardText>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col sm={12} md={6}>
            <Card>
              <CardBody>
                <CardText>
                  {this.props.parent2.student.preferredName != null &&
                    this.props.parent2.student.preferredName}
                  {this.props.parent2.student.preferredName === null &&
                    this.props.parent2.student.firstName}{" "}
                  {this.props.parent2.student.lastName}
                </CardText>
                {this.props.parent2.selfDescription != null && (
                  <CardText>
                    About me: {this.props.parent2.selfDescription}
                  </CardText>
                )}
                {this.props.parent2.student.socialMedia != null && (
                  <CardText>
                    Social Media: {this.props.parent2.student.socialMedia}
                  </CardText>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <h2>Children:</h2>
          </Col>
        </Row>
        {this.props.kids.length === 0 && (
          <Alert style={{ marginTop: "10px" }}>
            You currently have 0 kids assigned. Return to this page soon to see
            more information about your kids
          </Alert>
        )}
        <Row>
          {this.props.kids.map(kid => (
            <Card>
              <CardBody>
                <CardText>
                  {kid.student.preferredName != null &&
                    kid.student.preferredName}
                  {kid.student.preferredName === null && kid.student.firstName}{" "}
                  {kid.student.lastName}
                </CardText>
              </CardBody>
            </Card>
          ))}
        </Row>
      </>
    );
  }
}

export default Family;
