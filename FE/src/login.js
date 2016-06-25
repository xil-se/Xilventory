import React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';
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
  Panel,
  Collapse,
  Fade,
  Well,
  Label,
  ProgressBar,
  Alert
} from 'react-bootstrap';

const Login = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false,
        loggingIn: false
      };
    },

    handleSubmit(event) {
      event.preventDefault();

      this.setState({ 'loggingIn': true, error: false });

      const email = document.getElementById('formEmail').value;
      const pass = document.getElementById('formPassword').value;

      auth.login(email, pass, (loggedIn) => {
        this.setState({ 'loggingIn': false });

        if (!loggedIn)
          return this.setState({ error: true });

        const { location } = this.props;

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname);
        } else {
          this.props.router.replace('/');
        }
      });
    },

    render() {
      let wrongCredentials;
      if (this.state.error) {
        wrongCredentials = (
          <Alert bsStyle="danger">
            <strong>Cold solder!</strong> Wrong credentials, hacker!
          </Alert>);
      }

      let loggingIn;
      if (this.state.loggingIn) {
        loggingIn = (
          <div>
            <p/>
            <ProgressBar active now={100} />
          </div>);
      }

      return (
        <Grid>
          <Row>
            <Col sm={10} md={6}>
              <Panel header="Sign in" bsStyle="primary">
                <form onSubmit={this.handleSubmit}>

                  <Row>
                    <Col>
                      <Collapse transitionAppear={true} in={(this.state.error || this.state.loggingIn) }>
                        <div>
                          {wrongCredentials}
                          {loggingIn}
                        </div>
                      </Collapse>
                    </Col>
                  </Row>

                  <FormGroup controlId="formEmail">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="email" placeholder="Email" defaultValue="example@xil.se" />
                  </FormGroup>

                  <FormGroup controlId="formPassword">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" placeholder="Password" defaultValue="1337" />
                  </FormGroup>

                  <FormGroup>
                    <Col>
                      <Checkbox>Remember me</Checkbox>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col sm={2}>
                      <Button bsStyle="primary" type="submit">
                        Sign in
                      </Button>
                    </Col>
                    <Col sm={2}>
                      <Button onClick={()=>console.log(1337)}>
                        Forgot password
                      </Button>
                    </Col>
                  </FormGroup>

                </form>
              </Panel>
            </Col>
          </Row>
        </Grid>
      );
    }
  })
);

module.exports = Login;
