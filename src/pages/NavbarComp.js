import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Home from ".";
import Recipe from "./recipe";
import Ingredients from "./ingredients";
import Signup from "./Signup";
import Signin from "./signin";
import Pantry from "./pantry";
import Pantry2 from "./pantry2";
import Friend from "./friend";
import "./NavbarElements.css";

// what does this do
// const picture =
//   localStorage.getItem("picture") == null
//     ? signin_pic
//     : localStorage.getItem("picture").slice(1, -1);

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: "Home",
    };
  }
  isLoggedIn() {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData == null) return false;
    return true;
  }
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar collapseOnSelect className="backgroundhead">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link
                    eventKey="home"
                    as={Link}
                    to="/"
                    onClick={() => this.setState({ tag: "Home" })}
                    className="tabs"
                  >
                    About
                  </Nav.Link>{" "}
                  {this.isLoggedIn() && (
                    <Nav.Link
                      eventKey="Ingredients"
                      as={Link}
                      to="/Ingredients"
                      onClick={() => this.setState({ tag: "Ingredients" })}
                      className="tabs"
                    >
                      Ingredients
                    </Nav.Link>
                  )}
                  {this.isLoggedIn() && (
                    <Nav.Link
                      eventKey="pantry"
                      as={Link}
                      to="/pantry"
                      onClick={() => this.setState({ tag: "pantry" })}
                      className="tabs"
                    >
                      Pantries
                    </Nav.Link>
                  )}
                  {this.isLoggedIn() && (
                    <Nav.Link
                      eventKey="signin"
                      as={Link}
                      to="/signin"
                      onClick={() => this.setState({ tag: "Profile" })}
                      className="tab-profile"
                    >
                      Profile
                    </Nav.Link>
                  )}
                  {!this.isLoggedIn() && (
                    <Nav.Link
                      eventKey="signin"
                      as={Link}
                      to="/signin"
                      onClick={() => this.setState({ tag: "Login" })}
                      className="tab-profile"
                    >
                      Login
                    </Nav.Link>
                  )}
                  {!this.isLoggedIn() && (
                    <Nav.Link
                      eventKey="register"
                      as={Link}
                      to="/signup"
                      onClick={() => this.setState({ tag: "Register" })}
                      className="tab-profile"
                    >
                      Register
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/pantry">
              <Pantry />
            </Route>
            <Route path="/pantry2">
              <Pantry2 />
            </Route>
            <Route path="/friend">
              <Friend />
            </Route>
            <Route path="/Ingredients">
              <Ingredients />
            </Route>
            <Route path="/Recipe">
              <Recipe />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}