import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { App } from '../imports/ui/App.jsx';

const Jobs = new Mongo.Collection('jobs');

if (Meteor.isServer) {
  Meteor.publish('jobs', function jobsPublication() {
    return Jobs.find();
  });
}


if (Meteor.isServer) {
  Meteor.startup(() => {
    
  });
}