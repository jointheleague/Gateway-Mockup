import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem, InputGroup, Label, Button } from 'react-bootstrap';

export default class JobListings extends Component {
  constructor() {
    super();

    this.state = {
      languages: ["Java", "Python", "C", "C++", "C#", "F#", "VB", "JavaScript", "HTML", "TypeScript", "Rust", "PHP", "ASM", "Fortran", "Chef", "Perl" ]
    };
  }

  render() {
    const languageList = this.state.languages.map((value) => {
      return (
        <div key={value} style={{fontSize: 16 + "px"}}>
          <input type="checkbox" aria-label="..."/>&nbsp;{value}
        </div>
      );
    });

    return(
    <Grid>
    <Col md={4}>
      <div style={{margin: "auto"}}>
        <h2> Filters </h2>
      </div>
      <Panel>
          <fieldset>
            <legend> Languages </legend>
            {languageList}
          </fieldset>
          <br/>
          <fieldset>
            <legend> Level Range </legend>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Addon>Low</InputGroup.Addon>
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
               <InputGroup.Addon>High</InputGroup.Addon>
              </InputGroup>
           </Col>
           </fieldset>
      <br />
      <br />
      <br />
      <legend> Other Tags </legend>
      <InputGroup>
        <InputGroup.Addon>Tags</InputGroup.Addon>
      </InputGroup>
      </Panel>
    </Col>
    <Col md={8}>
      <div style={{margin: "auto"}}>
        <h2> Job Listings </h2>
      </div>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> James Gosling </a> </div>
          <p>I need someone to make me a Hello World program. I can't figure out how to use this language.</p>
          <br/>
          <Label bsStyle="primary">Lv. 1</Label>
          <Label bsStyle="default">Chef</Label>
          <Label bsStyle="default">Hello World</Label>
          <div className="pull-right">
            <Button bsStyle="success">View Job</Button>
          </div>
      </Panel>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> Anonymous </a> </div>
          <p>I need someone to make me a Turing-complete programming language. Syntax is irrelevant. I don't really care whether it's object oriented, functional, or whatever. I just need it.</p>
          <br/>
          <Label bsStyle="primary">Lv. 6</Label>
          <Label bsStyle="default">ASM</Label>
          <Label bsStyle="default">Language Design</Label>
          <div className="pull-right">
            <Button bsStyle="success">View Job</Button>
          </div>
      </Panel>
      <Panel>
          <h3> Job Title </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> League Student </a> </div>
          <p>I need someone to make me a Java spambot for educational purposes.</p>
          <br/>
          <Label bsStyle="primary">Lv. 3</Label>
          <Label bsStyle="default">Java</Label>
          <Label bsStyle="default">Networking</Label>
          <div className="pull-right">
            <Button bsStyle="success">View Job</Button>
          </div>
      </Panel>
    </Col>
    </Grid>
    );
  }
}