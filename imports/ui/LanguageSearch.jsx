import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';
import { FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

Languages = new Mongo.Collection("languages");

export default class LanguageSearch extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

    var list = this.props.languageList;
    this.state = {
      subscription: {
        languages: Meteor.subscribe("languages")
      },
      selectedLangs: list,
      search: ""
    };

    this.searchChanged = this.searchChanged.bind(this);
    this.listSelectedLanguages = this.listSelectedLanguages.bind(this);
    this.listLanguages = this.listLanguages.bind(this);
    this.listAllLanguages = this.listAllLanguages.bind(this);
    this.transferItem = this.transferItem.bind(this);
    this.getPopular = this.getPopular.bind(this);
  }

  searchChanged(ev) {
    this.setState({ search: ev.target.value.trim().toLowerCase() });
  }

  componentWillUnmount() {
    this.state.subscription.languages.stop();
  }

  popularLanguages() {
    return Languages.find({ popular: true }).fetch();
  }

  languages() {
    return Languages.find({ popular: false }).fetch();
  }

  transferItem(ev) {
    var item = ev.target;
    var text = item.innerHTML;

    if(this.state.selectedLangs.indexOf(text) == -1) {
      var langs = this.state.selectedLangs;
      langs.push(text);
      this.setState({ selectedLangs: langs });
    } else {
      var langs = this.state.selectedLangs;
      langs.splice(langs.indexOf(text), 1);
      this.setState({ selectedLangs: langs });
    }

    this.props.setLangs(this.state.selectedLangs);
  }

  listSelectedLanguages() {
    if(this.state.selectedLangs.length == 0) {
      return(
        <div className="languageScrollWindow">
          <ListGroup>
            <ListGroupItem>None</ListGroupItem>
          </ListGroup>
        </div>
      );
    } else {
      return(
        <div className="languageScrollWindow">
          <ListGroup>
            {
              this.state.selectedLangs.map((name) => {
                if(this.state.search == "" || name.toLowerCase().indexOf(this.state.search) > -1) {
                  return(<ListGroupItem key={name} style={{"cursor": "pointer"}} onClick={this.transferItem}>{name}</ListGroupItem>);
                }
              })
            }
          </ListGroup>
        </div>
      );
    }
  }

  listLanguages(list) {
    return list.map(language => {
      if(this.state.selectedLangs.indexOf(language.name) == -1 && (this.state.search == "" || language.name.toLowerCase().indexOf(this.state.search) > -1)) {
        return(<ListGroupItem key={language.name} style={{"cursor": "pointer"}} onClick={this.transferItem}>{language.name}</ListGroupItem>);
      }
    });
  }

  getPopular() {
    var popular = this.listLanguages(this.popularLanguages());

    var len = 0;
    for(var key in popular) {
      if(popular[key] !== undefined) {
        len++;
      }
    }

    if(len > 0) {
      return(
        <ListGroup>{popular}</ListGroup>
      );
    }
  }

  listAllLanguages() {

    return(
      <div className="languageScrollWindow">
        { this.getPopular() }
        <ListGroup>
          { this.listLanguages(this.languages()) }
        </ListGroup>
      </div>
    );
  }

  render() {
    return(
      <div className="rounded border border-dark">
        <FormControl type="text" onChange={this.searchChanged} placeholder="search for languages"/>
        <h3>Selected Languages</h3>
        { this.listSelectedLanguages() }
        <hr />
        <h3>Other Languages</h3>
        { this.listAllLanguages() }
      </div>
    );
  }
}

LanguageSearch.propTypes = {
  languageList: PropTypes.array.isRequired,
  setLangs: PropTypes.func.isRequired
}
