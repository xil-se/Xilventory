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
import About from './about';
import ItemList from './itemlist';
import Login from './login';
import Logout from './logout';
import MainScreen from './mainscreen';
import Profile from './profile';
import XilNavbar from './xilnavbar';

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
    let content;
    if (this.props.children) {
      content = this.props.children;
    } else {
      content = <MainScreen />;
    }
     
    return (
      <div>
        <XilNavbar loggedIn={this.state.loggedIn} />
        {content}
      </div>
    );
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
      <Route path="itemlist" component={ItemList} onEnter={requireAuth} />
      <Route path="profile" component={Profile} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'));
