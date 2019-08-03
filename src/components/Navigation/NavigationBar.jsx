import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./NavigationBar.css"

import {
  Navbar,
  NavItem,
  Nav,
  NavbarBrand,
  Container
} from "reactstrap";

class NavigationBar extends Component {
  render() {
    return (
        <Container>
          <Navbar className="NavigationBar"
          >
            <NavbarBrand className="logo" >
              <Link to="/" >
                <img
                  src={process.env.PUBLIC_URL + "/images/docsoc-square-white.png"}
                  height="60px"
                  width="60px"
                  alt="DoCSoc"
                />
              </Link>
            </NavbarBrand>

            <Nav>
              <NavItem className="NavigationBarItem">
                <Link to="/parent" className="NavigationBarLink">
                  <h2>
                    Parent
                  </h2>
                </Link>
              </NavItem>
              <NavItem className="NavigationBarItem">
                <Link to="/student" className="NavigationBarLink">
                  <h2>
                    Student
                  </h2>
                </Link>
              </NavItem>
            </Nav>
          </Navbar>
        </Container>
    );
  }
}

export default NavigationBar;
