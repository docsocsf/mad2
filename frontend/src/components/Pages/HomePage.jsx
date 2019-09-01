import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardTitle,
  CardText,
  CardBody
} from "reactstrap";

class HomePage extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={2} />
          <Col sm={8}>
            <Card style={{ marginTop: "10px" }}>
              <CardBody style={{ textAlign: "center" }}>
                <CardTitle>
                  <h1>
                    Welcome to DoCSoc's<br></br>Mums and Dads Portal!
                  </h1>
                </CardTitle>
                <CardText>
                  If you're unfamiliar with the Mums and Dads Scheme, every year
                  DoCSoc members can become the "adoptive parents" of a up to 6
                  freshers and form a family. It is not only a great way to
                  welcome freshers and help them settle into university life,
                  but for everyone involved to make some friends and enjoy some
                  events together. Each family will get a termly budget that
                  they can decide how to spend themselves.
                </CardText>

                <CardText>
                  <b>Parent Signup has now began!</b> If you want to be a
                  parent, click on the parent tab (top right) and login with
                  your Imperial credential. Fill in the sign up form, and make
                  sure your partner does too. You can then "propose" to your
                  partner using their shortcode. Finally make sure they accept
                  your proposal. After that we will assign 2-3 freshers to your
                  "family" (according to your common interests) and notify you
                  to check your new family members!
                </CardText>

                <CardText>
                  For any other information or questions, please contact DoCSoc
                  at <a href="mailto: docsoc@ic.ac.uk">docsoc@ic.ac.uk</a>.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm={2} />
        </Row>
      </Container>
    );
  }
}

export default HomePage;
