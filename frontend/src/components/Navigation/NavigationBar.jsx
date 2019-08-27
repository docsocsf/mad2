import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import "./NavigationBar.css";
import isLoggedIn from "../Auth/utils";
import { NavItem } from "reactstrap";

import { Navbar, Nav, NavbarBrand, Container } from "reactstrap";

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

  logout(e) {
    localStorage.expiry = 0;
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
            {!loggedIn && <NavbarItem linkTo="/parent">Parent</NavbarItem>}
            {!loggedIn && <NavbarItem linkTo="/student">Student</NavbarItem>}
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
