import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'profile.getFromID': function(profileID) {
    if(Meteor.isServer) {
      if(profileID instanceof Array) {
        profileID = Array.from(new Set(profileID)); // remove duplicate values
        var found = Meteor.users.find({"profile.tempID": { "$in": profileID}}).fetch();
        return found;
      } else {
        var found = Meteor.users.findOne({"profile.tempID": profileID});
        return found ? found.profile : null;
      }
    }
  },
  'profile.getFromGithub': function(gh) {
    if(Meteor.isServer) {
      var found = Meteor.users.findOne({"profile.github": gh});
      return found ? found.profile : null;
    }
  }
});
