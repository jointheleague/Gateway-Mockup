import { Meteor } from 'meteor/meteor';

Meteor.methods({
	'profile.getFromID': function (profileID) {
		if (Meteor.isServer) {
			if (profileID instanceof Array) {
				profileID = Array.from(new Set(profileID)); // remove duplicate values
				const found = Meteor.users.find({ 'profile.tempID': { $in: profileID } }).fetch();
				return found;
			}
			const found = Meteor.users.findOne({ 'profile.tempID': profileID });
			return found ? found.profile : null;
		}
		return undefined;
	},
	'profile.isMyProfile': function (username) {
		if (Meteor.isServer) {
			const found = Meteor.users.findOne({ _id: this.userId });
			return found.profile.username === username;
		}
		return undefined;
	},
	'profile.getFromUsername': function (username) {
		if (Meteor.isServer) {
			const found = Meteor.users.findOne({ 'profile.username': username });
			return found ? found.profile : null;
		}
		return undefined;
	},
	'profile.getTextField': function (username, textField) {
		// TODO : Currently this implementation will only work with a GitHub username passed in...change this later, for testing only.
		if (Meteor.isServer) {
			const found = Meteor.users.findOne({ 'profile.username': username });
			if (found) {
				// console.log("Returning found : " + JSON.stringify(found.profile.email"], null, 4));
				return found.profile[textField];
			}
			return 'Profile Could Not Be Found';
		}
		return undefined;
	},
	'profile.setTextField': function (textField, newValue) {
		// TODO : Currently this implementation will only work with a GitHub username passed in...change this later, for testing only.
		if (Meteor.isServer) {
			const fieldName = `profile.${textField}`;
			Meteor.users.update({ _id: this.userId }, { $set: { [fieldName]: newValue } }, (error, affectedDocs) => {
				if (error) {
					throw new Meteor.Error(500, error.message);
				}
			});
		}
		return undefined;
	},
	'profile.getCount': function () {
		if (Meteor.isServer) {
			return Meteor.users.find().count();
		}
		return undefined;
	}
});
