import React from 'react';
import { render } from 'react-dom';
import { Link, withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import auth from './auth';

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
        loggedIn: auth.loggedIn()
      };
    },

    componentDidMount() {
    },

    componentWillReceiveProps(props) {
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
            <LinkContainer to="/about"><NavItem eventKey={1}>About</NavItem></LinkContainer>
            <LinkContainer to="/login"><NavItem eventKey={2}>Sign in</NavItem></LinkContainer>
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
            <LinkContainer to="/about"><NavItem eventKey={1}>About</NavItem></LinkContainer>
            <LinkContainer to="/itemlist"><NavItem eventKey={2}>Browse</NavItem></LinkContainer>
            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
              <LinkContainer to="/profile"><MenuItem eventKey={3.1}>Profile</MenuItem></LinkContainer>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <LinkContainer to="/logout"><MenuItem eventKey={3.3}>Sign out</MenuItem></LinkContainer>
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


