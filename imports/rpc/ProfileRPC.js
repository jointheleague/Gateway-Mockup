import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'profile.getProfile': function(profileID) {
    if(Meteor.isServer) {
      var found = Meteor.users.findOne({"profile.tempID": profileID});
      return found ? found.profile : null;
    }
  }
});
