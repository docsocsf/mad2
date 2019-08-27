import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

import { NavItem } from "reactstrap";

function NavbarItem(props) {
  return (
    <NavItem>
      <Link to={props.linkTo} className="NavigationBarLink">
        <h3 className="LinkText">{props.children}</h3>
      </Link>
    </NavItem>
  );
}

export default NavbarItem;
