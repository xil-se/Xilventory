import React from 'react';
import { withRouter } from 'react-router';
import {
  ProgressBar,
  Panel,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import auth from './auth';

var Logout = withRouter(
  React.createClass({

    componentDidMount() {
      setTimeout(() => {
        auth.logout(() => {
          this.props.router.replace('/');
        });
      }, 1000);
    },

    render() {
      return (
        <Grid>
          <Row>
            <Col sm={10} md={6}>
              <Panel header="You are being signed out" bsStyle="primary">
                <div>
                  <strong>Please wait...</strong>
                  <ProgressBar active now={100} />
                </div>
              </Panel>
            </Col>
          </Row>
        </Grid>
      );
    }
  })
);

module.exports = Logout;
