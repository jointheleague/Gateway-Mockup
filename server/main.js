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
  const fs = Npm.require("fs");

  pushSampleData(Jobs, Meteor.settings.sampledata.Jobs);
  pushSampleData(Languages, Meteor.settings.sampledata.Languages);
});

function pushSampleData(collection, data) {
  if(collection.find({}).count() == 0) {
    for(var key in data) {
      var val = data[key];
      collection.insert(val);
    }
  }
}
