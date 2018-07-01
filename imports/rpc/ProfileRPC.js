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
  },
  'profile.getTextField': function(gh, textField) {
    //TODO : Currently this implementation will only work with a GitHub username passed in...change this later, for testing only.
    if(Meteor.isServer) {
      console.log(Meteor.users.findOne({}));
      var found = Meteor.users.findOne({"profile.github": gh});
      if(found){
        return found[textField];
      }else{
        return "Profile Could Not Be Found";
      }
    }
  },
  'profile.getCount': function() {
    if(Meteor.isServer) {
      return Meteor.users.find().count();
    }
  }
});
