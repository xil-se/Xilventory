import React from 'react';
import { withRouter } from 'react-router';
import {
    ProgressBar
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
                <div>
                    <h1>You are being signed out...</h1>
                    <ProgressBar active now={100} />
                </div>
            );
        }
    })
);

module.exports = Logout;
