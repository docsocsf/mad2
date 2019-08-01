import React, { Component } from "react";

import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  NavbarBrand,
  Col,
  Container,
  Row
} from "reactstrap";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar
        style={{
          backgroundColor: "#225590"
        }}
      >
        <NavbarBrand className="logo" href="/">
          <img
            src={process.env.PUBLIC_URL + "/images/docsoc-square-white.png"}
            height="60px"
            width="60px"
            alt="DoCSoc"
          />
        </NavbarBrand>

        <Nav>
          <NavItem>
            <NavLink
              style={{
                color: "white",
                paddingLeft: "0px",
                paddingRight: "20px",
                paddingTop: "20px"
              }}
              href="/parent"
            >
              Parent
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{
                color: "white",
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingTop: "20px"
              }}
              href="/student"
            >
              Student
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;
