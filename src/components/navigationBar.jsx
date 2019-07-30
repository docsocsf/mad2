import React, { Component } from "react";

import { Navbar, NavItem, NavLink, Nav} from "reactstrap";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar color="dark" dark>
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
