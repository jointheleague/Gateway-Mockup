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
    }
  }
});
