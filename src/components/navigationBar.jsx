import React, { Component } from "react";

import { Navbar, NavItem, NavLink, Nav, NavbarBrand} from "reactstrap";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar 
        style={{
          "background-color": "#225590"
        }}
      >
        <NavbarBrand href="/">
          <img 
            src={process.env.PUBLIC_URL + "/images/docsoc-square-white.png"}
            height="5%"
            width="5%"
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
          {/* <Col xs="3" md="auto">
                <Link
                  style={{
                    color: "white",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    paddingTop: "20px"
                  }}
                  class="nav-link"
                  to="/Map"
                >
                  Admin
                </Link>
          </Col> */}
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;
