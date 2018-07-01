import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import '../imports/rpc/ProfileRPC';
import '../imports/rpc/JobRPC';
import Jobs from '../imports/api/Jobs';
import Languages from '../imports/api/Languages';
import Messages from '../imports/api/Messages';
import Profiles from '../imports/api/Profiles';

Accounts.onCreateUser(function (options, user) {
  user.username = user.services.github.email;
  console.log("Creating user...");
  const profiles = Meteor.settings.sampledata.Profiles;
  var isSampleUser = false;
  for(var key in profiles) {
    const val = profiles[key];
    if(val.email == user.username) {
      user.profile = val;
      isSampleUser = true;
      break;
    }
  }

  if(!isSampleUser){
    //Load empty user template so the profile page may be filled out manually
    console.log("Adding blank profile for : " + user.services.github.email);
    user.profile = Meteor.settings.sampledata.EmptyUser;
    user.profile.github = user.services.github.username;
  }

  return user;
});

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    {
      service: 'github'
    },
    {
      $set: {
        clientId: '6488d774e9599a74c3cc',
        loginStyle: 'popup',
        secret: '896361c0d4475fa9c72940c652af253a3cc81efa'
      }
    }
  );

  setupCollection("jobs", Jobs, Meteor.settings.sampledata.Jobs);
  setupCollection("languages", Languages, Meteor.settings.sampledata.Languages);
  setupCollection("users", Meteor.users, Meteor.settings.sampledata.Users);
  setupCollection("messages", Messages, Meteor.settings.sampledata.Messages);
});

function setupCollection(name, collection, data) {
  Meteor.publish(name, function() {
    return collection.find();
  });

  if(collection.find({}).count() == 0) {
    for(var key in data) {
      var val = data[key];
      collection.insert(val);
    }
  }
}
