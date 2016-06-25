import React from 'react';
import { render } from 'react-dom';
import { withRouter } from 'react-router';

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
  Label,
  Panel,
  ProgressBar,
  ListGroup,
  ListGroupItem,
  Collapse
} from 'react-bootstrap';


var Profile = withRouter(
  React.createClass({

    getInitialState() {
      return {};
    },

    validateNewPassword() {
      return this.state.newPassword === this.state.newPasswordRepeat ? 'success' : 'warning';
    },

    handleSubmit(event) {
      event.preventDefault();

      this.setState({ 'loggingIn': true, error: false });

      const email = document.getElementById('formEmail').value;
      const pass = document.getElementById('formPassword').value;

    },

    render() {
      let status;
      status = <ListGroupItem bsStyle="success">You rock!</ListGroupItem>;
      return (
        <Grid>
          <Row>
            <Col sm={10} md={6}>
              <Panel header="Edit profile" bsStyle="primary">
                <form  onSubmit={this.handleSubmit}>
                  <Row>
                    <Col>
                      <Collapse transitionAppear={true} in={(this.state.error || this.state.loggingIn) }>
                        <div>
                        </div>
                      </Collapse>
                    </Col>
                  </Row>

                  <FormGroup controlId="formEmail">
                    <Col componentClass={ControlLabel}>
                      Name
                    </Col>
                    <Col>
                      <FormControl type="text" defaultValue="Foobarius Bazman" />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel}>
                      Email
                    </Col>
                    <Col>
                      <FormControl type="email" defaultValue="example@xil.se" />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalNewPassword">
                    <Col componentClass={ControlLabel}>
                      New password
                    </Col>
                    <Col>
                      <FormControl type="password" placeholder="Enter your password" onChange={(e) => {
                        this.setState({
                          newPassword: e.target.value,
                          showPasswordRepeat: !!e.target.value
                        });
                      } } />
                    </Col>
                  </FormGroup>


                  <Collapse transitionAppear={true} in={this.state.showPasswordRepeat}>
                    <FormGroup controlId="formHorizontalNewPasswordRepeat" validationState={this.validateNewPassword() }>
                      <Col>
                        <ControlLabel>Repeat password if you want to change it</ControlLabel>
                        <FormControl type="password" placeholder="Password" onChange={(e) => {
                          this.setState({
                            newPasswordRepeat: e.target.value
                          });
                        } } />
                        <FormControl.Feedback />
                      </Col>
                    </FormGroup>
                  </Collapse>

                  <FormGroup controlId="formPassword">
                    <Col componentClass={ControlLabel}>
                      Current password
                    </Col>
                    <Col>
                      <FormControl type="password" placeholder="Enter your password" />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col>
                      <Button bsStyle="primary" type="submit">
                        Submit
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

module.exports = Profile;
