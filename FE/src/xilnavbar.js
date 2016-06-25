import React from 'react';
import { render } from 'react-dom';
import { Link, withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
var auth = require('./auth');

import {
  Form,
  FormControl,
  FormGroup,
  Checkbox,
  Col,
  ControlLabel,
  Button,
  Row,
  Grid,
  Navbar,
  NavDropdown,
  NavItem,
  Nav,
  MenuItem
} from 'react-bootstrap';

const XilNavbar = withRouter(
  React.createClass({

    getInitialState() {
      return {
        loggedIn: false
      };
    },

    componentDidMount() {
    },

    componentWillReceiveProps (props) {
      this.setState({
        loggedIn: props.loggedIn
      });
    },

    renderLoggedOut() {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">XIL Inventory</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/login"><NavItem eventKey={1}>Sign in</NavItem></LinkContainer>
            <LinkContainer to="/about"><NavItem eventKey={2}>About</NavItem></LinkContainer>
          </Nav>
        </Navbar>);
    },

    renderLoggedIn() {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">XIL Inventory</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/about"><NavItem eventKey={2}>About</NavItem></LinkContainer>
            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Sign out</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>);
    },

    render() {
      return this.state.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
    }


  })
);

module.exports = XilNavbar;


