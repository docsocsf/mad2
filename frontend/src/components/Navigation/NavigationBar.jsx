import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import "./NavigationBar.css";
import isLoggedIn from "../Auth/utils";
import {} from "reactstrap";

import { Navbar, Nav, Container, NavItem, NavLink } from "reactstrap";

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
          <Link to="/" className="NavigationBarLink">
            <img
              className="Logo"
              src={process.env.PUBLIC_URL + "/images/docsoc-square-white.png"}
              height="60px"
              width="60px"
              alt="DoCSoc"
            />
            <h3
              className="LinkText NavigationBarLink"
              style={{ margin: "20px" }}
            >
              Mums and Dads
            </h3>
          </Link>
          <Nav>
            <NavbarItem linkTo="/parent">Parent</NavbarItem>
            {!loggedIn && (
              // <NavbarItem linkTo="/student">Fresher</NavbarItem>
              <NavLink disabled>
                <h3 className="LinkText" style={{ color: "lightgrey" }}>
                  Fresher
                </h3>
                <br></br>
                <p className="LinkText" style={{ color: "lightgrey" }}>
                  (Coming Soon)
                </p>
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
        </Navbar>
      </Container>
    );
  }
}

export default NavigationBar;
