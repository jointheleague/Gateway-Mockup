import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { App } from '../imports/ui/App.jsx';

const Jobs = new Mongo.Collection('jobs');


  Meteor.publish('jobs', function jobsPublication() {
    return Jobs.find();
  });

  Meteor.startup(() => {
    Jobs.insert({name : "Cool Job", desc : "This job involves writing a lot of for loops and unit tests. Be prepared.", langs : ["Fortran"], client : "John Doe", level : 3});
  });
