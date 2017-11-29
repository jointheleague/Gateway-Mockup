import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class JobListings extends Component {
  render() {
    return(
    <Grid>
        <div className="row">
    </div>
    <Col md={4}>
      <div align="center">
        <h2> Filters </h2>
      </div>
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
      <div align="center">
        <h2> Job Listings </h2>
      </div>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> Joe </a> </div>
          <p> Lorem ipsum dolor sit amet, dicunt discere argumentum cum ei. Sint primis dicunt quo et, eam eu viris scripta accusam. Duo doming possim laboramus at. Eu commodo accusam scripserit nec, vel eu quidam audire, quo meis errem ea.
          </p>
          <br/>
          <span className="label label-primary">Lv. 2</span>
          <span className="label label-default">Java</span>
          <span className="label label-default">For Loops</span>
          <div className="pull-right">
            <button type="button" className="btn btn-success">View Job</button>
          </div>
      </Panel>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> Joe </a> </div>
          <p> Lorem ipsum dolor sit amet, dicunt discere argumentum cum ei. Sint primis dicunt quo et, eam eu viris scripta accusam. Duo doming possim laboramus at. Eu commodo accusam scripserit nec, vel eu quidam audire, quo meis errem ea.
          </p>
          <br/>
          <span className="label label-primary">Lv. 2</span>
          <span className="label label-default">Java</span>
          <span className="label label-default">For Loops</span>
          <div className="pull-right">
            <button type="button" className="btn btn-success">View Job</button>
          </div>
      </Panel>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> Joe </a> </div>
          <p> Lorem ipsum dolor sit amet, dicunt discere argumentum cum ei. Sint primis dicunt quo et, eam eu viris scripta accusam. Duo doming possim laboramus at. Eu commodo accusam scripserit nec, vel eu quidam audire, quo meis errem ea.
          </p>
          <br/>
          <span className="label label-primary">Lv. 2</span>
          <span className="label label-default">Java</span>
          <span className="label label-default">For Loops</span>
          <div className="pull-right">
            <button type="button" className="btn btn-success">View Job</button>
          </div>
        </Panel>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> Joe </a> </div>
          <p> Lorem ipsum dolor sit amet, dicunt discere argumentum cum ei. Sint primis dicunt quo et, eam eu viris scripta accusam. Duo doming possim laboramus at. Eu commodo accusam scripserit nec, vel eu quidam audire, quo meis errem ea.
          </p>
          <br/>
          <span className="label label-primary">Lv. 2</span>
          <span className="label label-default">Java</span>
          <span className="label label-default">For Loops</span>
          <div className="pull-right">
            <button type="button" className="btn btn-success">View Job</button>
          </div>
        </Panel>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> Joe </a> </div>
          <p> Lorem ipsum dolor sit amet, dicunt discere argumentum cum ei. Sint primis dicunt quo et, eam eu viris scripta accusam. Duo doming possim laboramus at. Eu commodo accusam scripserit nec, vel eu quidam audire, quo meis errem ea.
          </p>
          <br/>
          <span className="label label-primary">Lv. 2</span>
          <span className="label label-default">Java</span>
          <span className="label label-default">For Loops</span>
          <div className="pull-right">
            <button type="button" className="btn btn-success">View Job</button>
          </div>
        </Panel>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> Joe </a> </div>
          <p> Lorem ipsum dolor sit amet, dicunt discere argumentum cum ei. Sint primis dicunt quo et, eam eu viris scripta accusam. Duo doming possim laboramus at. Eu commodo accusam scripserit nec, vel eu quidam audire, quo meis errem ea.
          </p>
          <br/>
          <span className="label label-primary">Lv. 2</span>
          <span className="label label-default">Java</span>
          <span className="label label-default">For Loops</span>
          <div className="pull-right">
            <button type="button" className="btn btn-success">View Job</button>
          </div>
        </Panel>
    </div>
    </Grid>
    );
  }
}