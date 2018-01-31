import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Dashboard extends Component {
  render() {
    return(
      <div>
        <Grid>
          <Row>
            <Col md={3}>
              <h2>Filters</h2>
              <ListGroup>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={9}>
              <h2>Activity Feed</h2>
              
              <Panel>
                <Panel header="New Commit From Jane Smith">
                  Git info and line changes here...
                </Panel>
                
                <div>November 21st</div>
                <br />

                <Panel header="New Commit From Jane Smith">
                  Git info and line changes here...
                 </Panel>

                 <Panel header="New Commit From Jane Smith">
                   Git info and line changes here...
                </Panel>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}