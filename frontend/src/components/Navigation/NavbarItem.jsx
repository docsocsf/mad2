import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

import { NavItem } from "reactstrap";

function NavbarItem(props) {
  return (
    <NavItem>
      <NavLink to={props.linkTo} className="NavigationBarLink">
        <h3 className="LinkText">{props.children}</h3>
      </NavLink>
    </NavItem>
  );
}

export default NavbarItem;
