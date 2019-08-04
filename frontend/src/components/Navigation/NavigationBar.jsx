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
        <Navbar className="NavigationBar">
            <NavbarBrand className="NavigationBarBrand">
              <Link to="/" >
                <img className="Logo" 
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
                  <h3 className="LinkText">
                    Parent
                  </h3>
                </Link>
              </NavItem>
              <NavItem className="NavigationBarItem">
                <Link to="/student" className="NavigationBarLink">
                  <h3 className="LinkText">
                    Student
                  </h3>
                </Link>
              </NavItem>
            </Nav>
        </Navbar>
      </Container>
    );
  }
}

export default NavigationBar;
