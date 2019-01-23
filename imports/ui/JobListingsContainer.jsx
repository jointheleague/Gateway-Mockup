import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { JobListings } from '/imports/ui/JobListings.jsx';
import { Jobs } from '/imports/api/Jobs.js';

export default JobListingsContainer = withTracker(() => {
	const jobsHandle = Meteor.subscribe('jobs');
	const loading = !jobsHandle.ready();
	const jobsCursor = Jobs.find({});
	const dataExists = !loading && !!jobsCursor;
	return {
		loading,
		dataExists,
		jobs: dataExists ? Jobs.find({}).fetch() : []
	};
})(JobListings);
