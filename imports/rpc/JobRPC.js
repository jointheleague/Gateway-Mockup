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
  }
});
