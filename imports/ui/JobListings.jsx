import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { Col, Panel, Grid, Row, ListGroup, ListGroupItem, InputGroup, Label, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

// TrackerReact is imported (default) with Meteor 1.3 new module system
import TrackerReact from 'meteor/ultimatejs:tracker-react';

// Get the Collection
Jobs = new Mongo.Collection("jobs");

  function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      
    </FormGroup>
  );
}

export default class JobListings extends TrackerReact(React.Component) {
    
    constructor() {
    super();
    this.state = {
          subscription: {
            jobs: Meteor.subscribe('jobs')
          },
          languages: ["Java", "Python", "C", "C++", "C#", "F#", "VB", "JavaScript", "HTML", "TypeScript", "Rust", "PHP", "ASM", "Fortran", "Chef", "Perl" ],
          selectedLangs : [""],
          upperLevelFilter : 0,
          lowerLevelFilter : 9
        };
        this.langSelected = this.langSelected.bind(this);
        this.levelRangeChanged = this.levelRangeChanged.bind(this);
  }

  levelRangeChanged(ev){
    if(ev.target.dataset.limit === "upper"){
      this.setState({upperLevelFilter : ev.target.value});
    }else if(ev.target.dataset.limit === "lower"){
      this.setState({upperLevelFilter : ev.target.value});
    }
  }


  langSelected(ev){
    if(ev.target.checked){
     this.setState({ selectedLangs : [...this.state.selectedLangs, ev.target.dataset.lang]});   
    }else{
      var indexToRemove = -1;
      for(i = 0; i < this.state.selectedLangs.length; i++){
       
        if(ev.target.dataset.lang === this.state.selectedLangs[i]){
          indexToRemove = i;
        }
      }

      if(!(indexToRemove == -1)){
        var newArray = this.state.selectedLangs;
        newArray.splice(indexToRemove, 1);
        this.setState({ selectedLangs : newArray});
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
  const languageList = this.state.languages.map((value) => {
      return (
        <div key={value} style={{fontSize: 16 + "px"}}>
          <input type="checkbox" onChange={this.langSelected} data-lang={value} aria-label="..."/>&nbsp;{value}
        </div>
      );
       });
    return(
      <div>
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
                <FieldGroup data-limit={"lower"} onChange={this.levelRangeChanged} type={"text"} label={"Upper Limit"} placeholder={"0"}/>
              
            </Col>
            <Col md={6}>
              
               <FieldGroup data-limit={"upper"} onChange={this.levelRangeChanged} type={"text"} label={"Lower Limit"} placeholder={"9"}/>
              
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
            if(job.level >= this.state.lowerLevelFilter && job.level <= this.state.upperLevelFilter){
            shouldReturn = true;
          }
          }
        }
      }
     
        if(shouldReturn){
           const langLabels = job.langs.map((lang) => {
            return(<div key={job.toString() + lang.toString()}><Label bsStyle="default">{lang}</Label></div>);
      });
              return (
                <div>
                 <Panel>
         <h3> {job.name} </h3>
          <div className="currentTextDisabledSmall"> Posted By <a href="#"> {job.client} </a> </div>
          <p> {job.desc} </p>
          <br/>
          <Label bsStyle="primary">Lv. {job.level}</Label>

          {langLabels}
        
          <div className="pull-right">
            <Button bsStyle="success">View Job</Button>
          </div>
        </Panel>
        </div>);
            }
            })}
     
    </Col>
    </Grid>
    </div>
    );
  }
}