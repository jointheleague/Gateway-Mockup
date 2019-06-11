import { Meteor } from 'meteor/meteor';
import Jobs from '../api/Jobs';

Meteor.methods({
	'job.getCount': function () {
		if (Meteor.isServer) {
			return Jobs.find().count();
		}
		return undefined;
	},
	'job.add': function (e) {
		if (Meteor.isServer) {
			Jobs.insert(e);
		}
		return undefined;
	},
	'job.getFromName': function (jobName) {
		if (Meteor.isServer) {
			return Jobs.findOne({ name: jobName });
		}
		return undefined;
	},
	'job.postComment': function (jobName, commentText) {
		if (Meteor.isServer) {
			const usr = Meteor.users.findOne({ _id: this.userId }).profile.username;
			const count = Jobs.find({ name: jobName }).fetch()[0].comments.length;
			Jobs.update({ name: jobName }, {
				$push: {
					comments: {
						text: commentText, username: usr, replies: [], id: count
					}
				}
			});

			const jobClient = Jobs.findOne({ name: jobName }).client;
			Meteor.users.update({ 'profile.username': jobClient }, {
				$push: {
					'profile.notifications': {
						type: 'newComment',
						username: usr,
						text: commentText,
						job: jobName,
						date: new Date(),
						viewed: false
					}
				}
			});
		}
		return undefined;
	},
	'job.postReply': function (jobName, commentIndex, replyText) {
		if (Meteor.isServer) {
			const usr = Meteor.users.findOne({ _id: this.userId }).profile.username;
			if (usr !== Jobs.find({ name: jobName }).fetch()[0].client) {
				return;
			}
			// var idx = "comments." + commentIndex + ".replies";
			// Jobs.update({name : jobName}, { $push: { [idx]: { text: replyText } } });
			Jobs.update({ name: jobName }, { $push: { [`comments.${commentIndex}.replies`]: { text: replyText } } });
		}
		return undefined;
	},
	'job.getApplication': function(jobName, username) {
		if (Meteor.isServer) {
			return Jobs.findOne({ name: jobName, 'applicants.username': username } ).applicants[0];
		}
	},
	'job.apply': function (jobName, application) {
		if (Meteor.isServer) {
			const applicantUsername = Meteor.users.findOne({ _id: this.userId }).profile.username;
			Jobs.update({ name: jobName }, {
				$push: {
					applicants: {
						username: applicantUsername,
						application: application
					}
				}
			});
			// Send notification to job owner
			const jobClient = Jobs.findOne({ name: jobName }).client;
			Meteor.users.update({ 'profile.username': jobClient }, {
				$push: {
					'profile.notifications': {
						type: 'newApplicant',
						applicant: applicantUsername,
						job: jobName,
						date: new Date(),
						viewed: false
					}
				}
			});
		}
		return undefined;
	}
});
