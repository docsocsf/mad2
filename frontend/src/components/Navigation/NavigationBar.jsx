import React from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import "./NavigationBar.css";

import { Navbar, Nav, NavbarBrand, Container } from "reactstrap";

function NavigationBar(props) {
  return (
    <Container>
      <Navbar className="NavigationBar">
        <NavbarBrand className="NavigationBarBrand">
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
        </NavbarBrand>
        <Nav>
          <NavbarItem linkTo="/parent">Parent</NavbarItem>
          <NavbarItem linkTo="/student">Student</NavbarItem>
        </Nav>
      </Navbar>
    </Container>
  );
}

export default NavigationBar;
