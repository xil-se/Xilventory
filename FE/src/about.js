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
            <Col sm={10} md={6}>
              <Panel header="About" bsStyle="primary">
                <p>The XIL Inventory is just awesome.</p>
              </Panel>
            </Col>
          </Row>
        </Grid>
      );
    }
  })
);

module.exports = About;
