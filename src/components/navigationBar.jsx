import React, { Component } from "react";

import { AppBar } from "react-toolbox/lib/app_bar";
import { Navigation } from "react-toolbox/lib/navigation";
import { Link } from "react-toolbox/lib/link";

class NavigationBar extends Component {
  render() {
    return (
      <AppBar title='React Toolbox' >
        <Navigation type='horizontal'>
          <Link href='/student' label='Student' icon='inbox' />
          <Link href='/parent' active label='Parent' icon='person' />
        </Navigation>
      </AppBar>
    );
  }
}

export default NavigationBar;
