import React, { Component } from 'react';
import {
  Col,
  Container,
  Row,
  Card,
  CardTitle,
  CardText,
  CardBody,
} from 'reactstrap';

class HomePage extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={0} md={2} />
          <Col xs={12} md={8}>
            <Card style={{ marginTop: '10px' }}>
              <CardBody>
                <CardTitle style={{ textAlign: 'center' }}>
                  <h2>
                    Welcome to DoCSoc's
                    <br />
                    Mums and Dads Portal!
                  </h2>
                </CardTitle>
                <CardText>
                  If you're unfamiliar with the Mums and Dads Scheme, every year
                  DoCSoc members can become the "adoptive parents" of a up to 6
                  freshers and form a family. It is not only a great way to
                  welcome freshers and help them settle into university life,
                  but for everyone involved to make some friends and enjoy some
                  events together. Each family will also get a termly budget
                  that they can decide how to spend themselves.
                </CardText>

                <CardText>
                  <b>Freshers sign up has opened! </b>
                  Click
                  {' '}
                  <a href="/fresher">here</a>
                  {' '}
                  to sign up! Fill in the sign up form and check your Imperial College email (i.e. ab1219@ic.ac.uk)

                </CardText>
                <CardText>
                  <b>Once you have signed up, we will inform you via email when you have been allocated a family!</b>
                </CardText>
              </CardBody>
            </Card>
            <Card style={{ marginTop: '10px' }}>
              <CardBody>
                <CardTitle style={{ textAlign: 'center' }}>
                  <h2>FAQ:</h2>
                </CardTitle>
                <CardTitle>
                  <h5><b>How does it all work?</b></h5>
                </CardTitle>
                <CardText>
                  Parents are existing 2nd, 3rd, and 4th year Computing and JMC
                  students in DoC. Each family will consist of two parents, and
                  up to 6 freshers. After term commences, there will be a
                  timetabled slot for freshers to meet their families, along
                  with some food and activities to get to know each other. Each
                  term there is also a small budget for each family (around 20
                  pounds) to use as appropriate (dinner, drinks, any family
                  gathering etc).
                </CardText>
                <CardTitle>
                  <h5><b>Can I sign up as a solo parent?</b></h5>
                </CardTitle>
                <CardText>
                  No, unfortunately you can't. You will need to sign up with a
                  partner - this is done to ensure the best possible experience
                  for incoming freshers. If you sign up without choosing a
                  partner, your registration will be ignored.
                </CardText>
                <CardTitle>
                  <h5>
                    <b>
                      I've already signed up on the union website. Do I sign up
                      here too?
                    </b>
                  </h5>
                </CardTitle>
                <CardText>
                  Yes, please do. If you haven't signed up on the union website
                  then you won't need to, as long as you sign up here.
                </CardText>
                <CardTitle>
                  <h5><b>How will freshers be allocated?</b></h5>
                </CardTitle>
                <CardText>
                  Based on the interests filled in, we do our best to assign
                  each fresher to fellow freshers and parents with similar
                  interests. If you're interested to find out more, the source
                  code of this application is available
                  {' '}
                  <a href="https://github.com/docsocsf/mad2">here</a>
.
                </CardText>
              </CardBody>
            </Card>
            <Card style={{ marginTop: '10px', marginBottom: '50px' }}>
              <CardBody style={{ textAlign: 'center' }}>
                <CardText>
                  For any other information or queries please contact DoCSoc
                  at
                  {' '}
                  <a href="mailto: docsoc@ic.ac.uk">docsoc@ic.ac.uk</a>
.
                  <br />
                  For any privacy concerns you can find our privacy and GDPR policy
                  {' '}
                  <a href="/MaD-privacy-policy.pdf">here</a>
.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={0} md={2} />
        </Row>
      </Container>
    );
  }
}

export default HomePage;
