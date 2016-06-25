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
  Label
} from 'react-bootstrap';

const Login = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false
      };
    },

    handleSubmit(event) {
      event.preventDefault();

      const email = formHorizontalEmail.value;
      const pass = formHorizontalPassword.value;

      auth.login(email, pass, (loggedIn) => {
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
      return (
        <Grid>
          <Row>
            <Col>
              <h3>Please sign in</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Col smOffset={2} sm={4}>
                    <h4>&nbsp;
                    { this.state.error &&
                      <Label bsStyle="warning">Wrong credentials</Label>
                    }
                    </h4>
                    
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={4}>
                    <FormControl onChange={(e) => console.log(e.target.value) } ref="email" type="email" placeholder="Email" defaultValue="example@xil.se" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={4}>
                    <FormControl ref="password" type="password" placeholder="Password" defaultValue="1337" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={4}>
                    <Checkbox>Remember me</Checkbox>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={4}>
                    <Button type="submit">
                      Sign in
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      );
    }
  })
);

module.exports = Login;
