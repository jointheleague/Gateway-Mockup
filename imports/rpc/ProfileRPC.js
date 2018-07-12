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
  'profile.isMyProfile': function(username) {
    if(Meteor.isServer) {
      var found = Meteor.users.findOne({_id: this.userId});
      return found.profile.username === username;
    }
  },
  'profile.getFromUsername': function(username) {
    if(Meteor.isServer) {
      var found = Meteor.users.findOne({"profile.username": username});
      return found ? found.profile : null;
    }
  },
  'profile.getTextField': function(username, textField) {
    //TODO : Currently this implementation will only work with a GitHub username passed in...change this later, for testing only.
    if(Meteor.isServer) {
      var found = Meteor.users.findOne({"profile.username": username});
      if(found){
        //console.log("Returning found : " + JSON.stringify(found.profile.email"], null, 4));
        return found.profile[textField];
      }else{
        return "Profile Could Not Be Found";
      }
    }
  },
  'profile.setTextField': function(textField, newValue) {
    //TODO : Currently this implementation will only work with a GitHub username passed in...change this later, for testing only.
    if(Meteor.isServer) {
      var fieldName = "profile." + textField;
      Meteor.users.update({_id: this.userId}, {$set : {[fieldName] : newValue}}, function(error, affectedDocs) {
          if (error) {
              throw new Meteor.Error(500, error.message);
          }
    });
  }
  },
  'profile.getCount': function() {
    if(Meteor.isServer) {
      return Meteor.users.find().count();
    }
  }
});
