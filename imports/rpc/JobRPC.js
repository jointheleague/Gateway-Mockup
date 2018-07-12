import { Meteor } from 'meteor/meteor';
import Jobs from '../api/Jobs';

Meteor.methods({
  'job.getCount': function() {
    if(Meteor.isServer) {
      return Jobs.find().count();
    }
  },
  'job.add': function(e) {
    if(Meteor.isServer) {
      Jobs.insert(e);
    }
  },
  'job.getFromName': function(jobName) {
    if(Meteor.isServer) {
      return Jobs.findOne({name : jobName});
    }
  },
  'job.postComment': function(jobName, commentText) {
    if(Meteor.isServer) {
      var usr = Meteor.users.findOne({_id : this.userId}).profile.username;
      Jobs.update({name : jobName}, {$push:{comments : {text : commentText, username : usr}}});
      //Send notification to job owner
      var jobClient = Jobs.findOne({name : jobName}).client;
      Meteor.users.update({'profile.username' : jobClient}, {$push:{'profile.notifications' : {type : "newComment", username : usr, 'jobName' : jobName, text : commentText}}});
    }
  },
  'job.apply': function(jobName) {
    if(Meteor.isServer) {
      var applicantUsername = Meteor.users.findOne({_id : this.userId}).profile.username;
      Jobs.update({name : jobName}, {$push:{applicants : {username : applicantUsername}}});
      //Send notification to job owner
      var jobClient = Jobs.findOne({name : jobName}).client;
      Meteor.users.update({'profile.username' : jobClient}, {$push:{'profile.notifications' : {type : "newApplicant", applicant : applicantUsername, 'jobName' : jobName}}});

    }
  }
});
