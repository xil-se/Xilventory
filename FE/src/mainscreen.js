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

var About = withRouter(
  React.createClass({

    render() {
      return (
        <Grid>
          <Row>
            <Col>
              <img src="./assets/logo.svg" />
            </Col>
          </Row>
        </Grid>
      );
    }
  })
);

module.exports = About;
