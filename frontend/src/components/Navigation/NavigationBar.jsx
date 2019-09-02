import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import "./NavigationBar.css";
import isLoggedIn from "../Auth/utils";

import { Navbar, Nav, Container, NavItem, NavLink, Col } from "reactstrap";

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: isLoggedIn()
    };

    setInterval(() => {
      this.checkLogin();
    }, 500);

    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  checkLogin() {
    this.setState({
      loggedIn: isLoggedIn()
    });
  }

  logout() {
    document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.expiry = 0;
    localStorage.shortcode = null;
    localStorage.lastName = null;
    localStorage.firstName = null;
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Container>
        <Navbar className="NavigationBar">
          <Col>
            <Link to="/" className="NavigationBarLink">
              <img
                className="Logo"
                src={process.env.PUBLIC_URL + "/images/docsoc-square-white.png"}
                height="60px"
                width="58px"
                alt="DoCSoc"
              />
              <h3
                className="LinkText NavigationBarLink d-none d-md-inline"
                style={{ marginLeft: "10px" }}
              >
                Mums and Dads
              </h3>
              <h3
                className="LinkText NavigationBarLink d-md-none"
                style={{ marginLeft: "10px" }}
              >
                MAD
              </h3>
            </Link>
          </Col>
          <Col sm="auto" xs="5">
            <Nav pills>
              <NavbarItem linkTo="/parent">Parent</NavbarItem>
              {!loggedIn && (
                // <NavbarItem linkTo="/student">Fresher</NavbarItem>
                <NavLink disabled>
                  <h3 className="LinkText" style={{ color: "#c0c0c0cb" }}>
                    Fresher
                  </h3>
                </NavLink>
              )}
              {loggedIn && (
                <NavItem>
                  <Link
                    to={"/"}
                    onClick={this.logout}
                    className="NavigationBarLink"
                  >
                    <h3 className="LinkText">Logout</h3>
                  </Link>
                </NavItem>
              )}
            </Nav>
          </Col>
        </Navbar>
      </Container>
    );
  }
}

export default NavigationBar;
