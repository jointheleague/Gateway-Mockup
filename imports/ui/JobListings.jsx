import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem, InputGroup, Label, Button } from 'react-bootstrap';

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
          },
          languages: ["Java", "Python", "C", "C++", "C#", "F#", "VB", "JavaScript", "HTML", "TypeScript", "Rust", "PHP", "ASM", "Fortran", "Chef", "Perl" ],
          selectedLangs : [""]
        };
        this.langSelected = this.langSelected.bind(this);
  }

  langSelected(ev){
    if(ev.target.checked){
     this.setState({ selectedLangs : [...this.state.selectedLangs, ev.target.dataset.lang]});   
    }else{
      var indexToRemove;
      for(i = 0; i < this.state.selectedLangs.size; i++){
        if(ev.target.dataset.lang === this.state.selectedLangs.get(i)){
          indexToRemove = i;
        }
      }
      this.setState({ selectedLangs : this.state.selectedLangs.splice(i, 1)});
    }
  }
  
  componentWillUnmount() {
    this.state.subscription.jobs.stop();
  }

  jobs(){
    return Jobs.find({}).fetch();
  }

  render() {
  const languageList = this.state.languages.map((value) => {
      return (
        <div key={value} style={{fontSize: 16 + "px"}}>
          <input type="checkbox" onChange={this.langSelected} data-lang={value} aria-label="..."/>&nbsp;{value}
        </div>
      );
       });
    return(
      <div>
      <AppNavbar username="lucas"></AppNavbar>
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
     {this.jobs().map((job) => {
      var shouldReturn = false;
      for(i in job.langs){
        for(j in this.state.selectedLangs){
          if(job.langs[i] === this.state.selectedLangs[j]){
            shouldReturn = true;
          }
        }
      }
     // shouldReturn = true;
        if(shouldReturn){
              return (
                <div>
                 <Panel>
         <h3> {job.name} </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> {job.client} </a> </div>
          <p> {job.desc} </p>
          <br/>
          <Label bsStyle="primary">Lv. {job.level}</Label>
          <Label bsStyle="default">Java</Label>
          <Label bsStyle="default">Networking</Label>
          <div className="pull-right">
            <Button bsStyle="success">View Job</Button>
          </div>
      
      </Panel>
                </div>
              );
            }
            })}
     
    </Col>
    </Grid>
    </div>
     
        


  
    );
  }
}