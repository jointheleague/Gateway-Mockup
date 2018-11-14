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
      var count = Jobs.find({name: jobName}).fetch()[0].comments.length;
      Jobs.update({name : jobName}, {$push:{comments : {text : commentText, username : usr, replies: [], id: count}}});
    }
  },
  'job.postReply': function(jobName, commentIndex, replyText) {
    if(Meteor.isServer) {
      var usr = Meteor.users.findOne({_id : this.userId}).profile.username;
      if(usr != Jobs.find({name: jobName}).fetch()[0].client) {
        return;
      }
      // var idx = "comments." + commentIndex + ".replies";
      // Jobs.update({name : jobName}, { $push: { [idx]: { text: replyText } } });
      Jobs.update({name: jobName}, {$push: {["comments." + commentIndex + ".replies"]: {text: replyText}}});
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
