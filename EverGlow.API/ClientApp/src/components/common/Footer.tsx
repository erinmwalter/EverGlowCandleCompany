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
import logo from "../../../public/assets/artfulFlame_black.jpg";
import LoginButton from "./Login";

const env = process.env.REACT_APP_ENVIRONMENT;

export class Footer extends Component {



  render() {
    return (
        <footer className="fixed-bottom">
            <div style={{alignSelf:"center"}}>
            <img 
                alt="ArtfulFlameCandleCo."
                src={logo}
                style={{
                    height: 50,
                    width: 50
                }}
                
            />
            </div>
            <div style={{alignSelf:"center"}}>
                <LoginButton />
            </div>
        </footer>
    );
  }
}