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
      var found = Meteor.users.findOne({"profile.github": gh});
      if(found){
        //console.log("Returning found : " + JSON.stringify(found.profile.email"], null, 4));
        return found.profile[textField];
      }else{
        return "Profile Could Not Be Found";
      }
    }
  },
  'profile.setTextField': function(gh, textField, newValue) {
    //TODO : Currently this implementation will only work with a GitHub username passed in...change this later, for testing only.
    if(Meteor.isServer) {
      //var found = Meteor.users.findOne({"profile.github": gh});
      console.log("Setting profile " + gh + " for field " + textField + " and value " + newValue);
      //var fieldName = "profile." + textField;
      var fieldName = "profile." + textField;
      console.log("Using fieldname : " + fieldName);
      if(this.userId == Meteor.users.findOne({"profile.github": gh})._id){
      Meteor.users.update({"profile.github": gh}, {$set : {[fieldName] : newValue}}, function(error, affectedDocs) {
          if (error) {
              throw new Meteor.Error(500, error.message);
          }else{
            console.log("Effected docs : "  + JSON.stringify(affectedDocs));
          }
    });
    console.log(JSON.stringify(Meteor.users.findOne({"profile.github": gh})));
  }else{
    console.log("Attempt to modify user without login by : " + gh);
  }
  }
  },
  'profile.getCount': function() {
    if(Meteor.isServer) {
      return Meteor.users.find().count();
    }
  }
});
