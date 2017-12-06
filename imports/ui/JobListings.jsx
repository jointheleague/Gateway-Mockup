import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

// TrackerReact is imported (default) with Meteor 1.3 new module system
import TrackerReact from 'meteor/ultimatejs:tracker-react';

// Get the Collection
Jobs = new Mongo.Collection("jobs");

export default class JobListings extends TrackerReact(React.Component) {
    
    constructor() {
    super();
    this.state = {
          subscription: {
            jobs: Meteor.subscribe('jobs')
          }
        }
  }
  
  componentWillUnmount() {
    this.state.subscription.jobs.stop();
  }

  jobs(){
    return Jobs.find({}).fetch();
  }

  render() {

    return(
    <Grid>
        <div className="row">
    </div>
    <Col md={4}>
      
        <h2> Filters </h2>
      
      <Panel>
          <legend> Languages </legend>
          <div style={{fontSize: 16 + "px"}}> <input type="checkbox" aria-label="..."/>  Java </div>
          <div style={{fontSize: 16 + "px"}}> <input type="checkbox" aria-label="..."/>  Python </div>
          <div style={{fontSize: 16 + "px"}}> <input type="checkbox" aria-label="..."/>  HTML </div>
          <div style={{fontSize: 16 + "px"}}> <input type="checkbox" aria-label="..."/>  C </div>
          <div style={{fontSize: 16 + "px"}}> <input type="checkbox" aria-label="..."/>  C++ </div>
          <div style={{fontSize: 16 + "px"}}> <input type="checkbox" aria-label="..."/>  Rust </div>
          <br/>
          <legend> Level Range </legend>
          <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">Low</span>
            <input type="text" className="form-control" placeholder="0" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className="col-md-6">
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">High</span>
          <input type="text" className="form-control" placeholder="9" aria-describedby="basic-addon1"/>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <legend> Other Tags </legend>
      <div className="input-group">
        <span className="input-group-addon" id="basic-addon1">Tags</span>
        <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon1"/>
      </div>
      </Panel>
    </Col>
    <div className="col-md-8">
      
        <h2> Job Listings </h2>
     
        
        {this.jobs().map((job) => {
              return <h1> {job.name}   </h1>;
            })}


    </div>
    </Grid>
    );
  }
}