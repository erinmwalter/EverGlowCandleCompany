import React, { Component } from "react";
import {
  Collapse,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/artfulFlame_candleOnly.png";
import Profile from "./Profile";

const env = process.env.REACT_APP_ENVIRONMENT;

class NavMenu extends Component {
  static displayName = NavMenu.name;

  state = {
    collapsed: true,
  };

  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    console.log("show nav");
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
          color="black"
          container
          dark
        >
          <NavbarBrand tag={Link} to="/">
            <img 
                alt="ArtfulFlameCandleCo."
                src={logo}
                style={{
                    height: 150,
                    width: 150
                }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!this.state.collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/">
                  Home
                </NavLink>
              </NavItem>
              {
                <NavItem>
                <NavLink tag={Link} className="text-light" to="/">
                  <Profile/>
                </NavLink>
              </NavItem>
              }
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
export default NavMenu;