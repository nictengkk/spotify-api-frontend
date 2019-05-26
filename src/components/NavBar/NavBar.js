import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends React.Component {
  render() {
    const { token } = this.props;
    return (
      <Nav>
        <NavItem className="navbar">
          <Link
            to={{
              pathname: "/search",
              state: {
                token: token
              }
            }}
          >
            Search Genre
          </Link>
        </NavItem>
        <NavItem className="navbar">
          <Link
            to={{
              pathname: "/player",
              state: {
                token: token
              }
            }}
          >
            Spotify Web Player
          </Link>
        </NavItem>
        <NavItem className="navbar">
          <Link
            to={{
              pathname: "/nowplaying",
              state: {
                token: token
              }
            }}
          >
            Analyse Current Track
          </Link>
        </NavItem>
      </Nav>
    );
  }
}

export default NavBar;
