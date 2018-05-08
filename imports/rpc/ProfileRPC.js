import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'profile.getFromID': function(profileID) {
    if(Meteor.isServer) {
      var found = Meteor.users.findOne({"profile.tempID": profileID});
      return found ? found.profile : null;
    }
  },
  'profile.getFromGithub': function(gh) {
    if(Meteor.isServer) {
      var found = Meteor.users.findOne({"profile.github": gh});
      return found ? found.profile : null;
    }
  }
});
