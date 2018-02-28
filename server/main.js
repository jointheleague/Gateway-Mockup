import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { App } from '../imports/ui/App.jsx';

const Jobs = new Mongo.Collection('jobs');
const Languages = new Mongo.Collection('languages');

Meteor.publish('jobs', function jobsPublication() {
  return Jobs.find();
});

Meteor.startup(() => {
  if(Jobs.find({}).count() == 0) {
    Jobs.insert({name : "Cool Job", desc : "This job involves writing a lot of for loops and unit tests. Be prepared.", langs : ["Java"], client : "John Doe", level : 4});
    Jobs.insert({name : "Best Job", desc : "This job involves writing a lot of for loops and unit tests. Be prepared.", langs : ["Fortran"], client : "John Doe", level : 1});
    Jobs.insert({name : "Better Job", desc : "This job involves writing a lot of for loops and unit tests. Be prepared.", langs : ["C++", "Rust"], client : "John Doe", level : 4});
    Jobs.insert({name : "Difficult Job", desc : "This job involves writing a lot of for loops and unit tests. Be prepared.", langs : ["C++"], client : "John Doe", level : 9});
    Jobs.insert({name : "Easy Job", desc : "This job involves writing a lot of for loops and unit tests. Be prepared.", langs : ["Fortran"], client : "John Doe", level : 2});
  }

  if(Languages.find({}).count() == 0) {
    Languages.insert({name: "Java", popular: true});
    Languages.insert({name: "C++", popular: true});
    Languages.insert({name: "Cornflakes", popular: false});
    Languages.insert({name: "Fortran", popular: false});
    Languages.insert({name: "Rust", popular: false});
  }
});
