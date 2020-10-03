import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {};

  // Logout from system
  handleLogout = () => {
    localStorage.clear();
    window.history.go("/login");
  };

  render() {
    const username = localStorage.getItem("userName");
    let button;
    // render login / logout button based on user state
    if (username) {
      button = <Button onClick={this.handleLogout}>Logout</Button>;
    } else {
      button = (
        <Link to="/login" className="btn btn-info" type="button">
          Login
        </Link>
      );
    }
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Streaming Live</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/videos">Videos</Nav.Link>
              <Nav.Link href="/audios">Audio</Nav.Link>
              <Nav.Link href="/images">Images</Nav.Link>
            </Nav>
            {button}
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}
export default Header;
