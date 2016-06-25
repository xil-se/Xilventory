import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
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

import auth from './auth';
import XilNavbar from './XilNavbar';
import Login from './login';
import Logout from './logout';

const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    };
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    });
  },

  componentWillMount() {
    auth.onChange = this.updateAuth;
    auth.login();
  },

  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <XilNavbar loggedIn={this.state.loggedIn} />
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.children}
          </Col>
        </Row>
      </Grid>

    );
  }
});


const Dashboard = React.createClass({
  render() {
    const token = auth.getToken();

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    );
  }
});


const About = React.createClass({
  render() {
    return <h1>About</h1>;
  }
});

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'));
