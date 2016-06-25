import React from 'react';
import { withRouter } from 'react-router';
import {
    ProgressBar,
    Table,
    Panel,
    Grid,
    Row,
    Col
} from 'react-bootstrap';

import auth from './auth';

var initialItems = [
  {
    'name': 'Capacitor 4.7µF',
    'description': 'Very nice, 1%, 0603, super delicious cap.',
    'location': 'Hackerspace->Rack3->Row2->Box1',
    'amount': 42,
    'price': 0.34
  },
  {
    'name': 'Resistor 200 Ohm',
    'description': 'Not so nice, 10%, 0603, super delicious resistor.',
    'location': 'Hackerspace->Rack2->Row5->Box3',
    'amount': 4,
    'price': 0.04
  }
];

for (let i = 0; i < 100; i++) {
  initialItems.push({
    'name': 'Resistor 200 Ohm',
    'description': 'Not so nice, 10%, 0603, super delicious resistor.',
    'location': 'Hackerspace->Rack2->Row5->Box3',
    'amount': i,
    'price': 0.04
  });
}

initialItems = initialItems.splice(0, 10);

const titles = [
  'Name',
  'Description',
  'Location',
  'Amount',
  'Price'
];

var ItemList = withRouter(
    React.createClass({

      getInitialState() {
        return { items: initialItems };
      },

      render() {
        return (
            <Grid>
                <Row>
                    <Col>
                    <h1>Items in the inventory</h1>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                            <tr>
                                {
                                    titles.map(function (title) {
                                      return <th key={title}>{title}</th>;
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(function (row, i) {
                                  return (
                                        <tr key={i}>
                                            <td key="0">{row.name}</td>
                                            <td key="1">{row.description}</td>
                                            <td key="2">{row.location}</td>
                                            <td key="3">{row.amount}</td>
                                            <td key="4">{row.price}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                    </Col>
                </Row>
            </Grid>
            );
      }
    })
);

module.exports = ItemList;
