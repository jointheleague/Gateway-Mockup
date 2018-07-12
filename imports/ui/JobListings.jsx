import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import classnames from "classnames";
import AppNavbar from "./AppNavbar";
import LanguageSearch from "./LanguageSearch";
import { withTracker } from "meteor/react-meteor-data";
import {
	Col,
	Panel,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	InputGroup,
	Label,
	Button,
	FormGroup,
	ControlLabel,
	FormControl
} from "react-bootstrap";

// Get the Collection
import Jobs from '../api/Jobs';

function FieldGroup({ id, label, help, ...props }) {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
		</FormGroup>
	);
}

class JobListings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subscription: {
				jobs: Meteor.subscribe("jobs")
			},
			languages: [
				"Java",
				"Python",
				"C",
				"C++",
				"C#",
				"F#",
				"VB",
				"JavaScript",
				"HTML",
				"TypeScript",
				"Rust",
				"PHP",
				"ASM",
				"Fortran",
				"Chef",
				"Perl"
			],
			selectedLangs: [],
			lowerLevelFilter: 0,
			upperLevelFilter: 9,
			search: "",
			profiles: {},
			loadingProfiles: false
		};
		this.langSelected = this.langSelected.bind(this);
		this.levelRangeChanged = this.levelRangeChanged.bind(this);
		this.searchChanged = this.searchChanged.bind(this);
		this.setLangs = this.setLangs.bind(this);
	}

	searchChanged(ev) {
		this.setState({ search: ev.target.value.toLowerCase().trim() });
	}

	levelRangeChanged(ev) {
		if (ev.target.dataset.limit === "upper") {
			this.setState({ upperLevelFilter: ev.target.value });
		} else if (ev.target.dataset.limit === "lower") {
			this.setState({ upperLevelFilter: ev.target.value });
		}
	}

	setLangs(x) {
		this.setState({ selectedLangs: x });
	}

	langSelected(ev) {
		if (ev.target.checked) {
			this.setState({
				selectedLangs: [...this.state.selectedLangs, ev.target.dataset.lang]
			});
		} else {
			var indexToRemove = -1;
			for (i = 0; i < this.state.selectedLangs.length; i++) {
				if (ev.target.dataset.lang === this.state.selectedLangs[i]) {
					indexToRemove = i;
				}
			}

			if (indexToRemove != -1) {
				var newArray = this.state.selectedLangs;
				newArray.splice(indexToRemove, 1);
				this.setState({ selectedLangs: newArray });
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.jobs.stop();
	}

	jobs() {
		return this.props.jobs;
	}

	render() {
		if(this.props.dataIsReady && Object.keys(this.state.profiles).length === 0) {
			this.jobs().map(job => job.client).forEach(client => {
				Meteor.call("profile.getFromUsername", client, (error, profile) => {
					var dict = {...this.state.profiles};
					dict[client] = profile;

					this.setState({
						profiles: dict
					});
					if(Object.keys(this.state.profiles).length == this.jobs().length) {
						this.setState({
							loadingProfiles: false
						});
					}
				});
			});
		}

		if (!this.props.dataIsReady || this.state.loadingProfiles || Object.keys(this.state.profiles).length === 0) {
			return (
				<div style={{ padding: 50 }}>
					<h1>Loading...</h1>
				</div>
			);
		}

		return (
			<div>
				<Grid>
					<Col md={4}>
						<div style={{ margin: "auto" }}>
							<h2> Filters </h2>
						</div>
						<Panel>
							<Panel.Body>
							<fieldset>
								<legend> Languages </legend>
								<LanguageSearch
									languageList={this.state.selectedLangs}
									setLangs={this.setLangs}
								/>
							</fieldset>
							<br />
							<fieldset>
								<legend> Level Range </legend>
								<Col md={6}>
									<FieldGroup
										data-limit={"lower"}
										onChange={this.levelRangeChanged}
										type={"text"}
										label={"Lower Limit"}
										placeholder={"0"}
									/>
								</Col>
								<Col md={6}>
									<FieldGroup
										data-limit={"upper"}
										onChange={this.levelRangeChanged}
										type={"text"}
										label={"Upper Limit"}
										placeholder={"9"}
									/>
								</Col>
							</fieldset>
							<br />
							<br />
							<br />
							<legend> Other Tags </legend>
							<InputGroup>
								<InputGroup.Addon>Tags</InputGroup.Addon>
							</InputGroup>
							</Panel.Body>
						</Panel>
					</Col>
					<Col md={8}>
						<div style={{ margin: "auto" }}>
							<h2 id="jobListingsHeader"> Job Listings </h2>
							<FormControl
								type="text"
								onChange={this.searchChanged}
								placeholder="search for jobs"
							/>
							<br />
						</div>
						{this.jobs().map(job => {
							var validLangs = false;
							var validLevel = false;
							var validSearch = false;

							if (this.state.selectedLangs.length > 0) {
								for (i in job.langs) {
									for (j in this.state.selectedLangs) {
										if (job.langs[i] === this.state.selectedLangs[j]) {
											validLangs = true;
										}
									}
								}
							} else {
								validLangs = true;
							}

							if (this.state.search != "") {
								if (
									job.name
										.toLowerCase()
										.trim()
										.indexOf(this.state.search) !== -1
								) {
									validSearch = true;
								}
							} else {
								validSearch = true;
							}

							if (
								!(
									this.state.lowerLevelFilter == 0 &&
									this.state.upperLevelFilter == 9
								)
							) {
								if (
									job.level >= this.state.lowerLevelFilter &&
									job.level <= this.state.upperLevelFilter
								) {
									validLevel = true;
								}
							} else {
								validLevel = true;
							}

							if (validLangs && validLevel && validSearch) {
								const langLabels = job.langs.map(lang => {
									return (
										<span
											style={{ paddingRight: "5px" }}
											key={job.toString() + lang.toString()}
										>
											<Label bsStyle="default">{lang}</Label>
										</span>
									);
								});
								var profile = this.state.profiles[job.client];
								if(!profile) {
									profile = {
										username: "",
										firstName: "Unknown",
										lastName: "User"
									};
								}
								return (
									<div
										key={
											job.name +
											job.desc +
											job.client +
											job.level +
											Math.random()
										}
									>
										<Panel>
											<Panel.Body>
											<h3> {job.name} </h3>
											<div className="currentTextDisabledSmall">
												{" "}
												Posted By <a href={"/profile/" + profile.username}> {profile.firstName + " " + profile.lastName} </a>{" "}
											</div>
											<p> {job.desc} </p>
											<br />
											<span style={{ paddingRight: "5px" }}>
												<Label bsStyle="primary">Lv. {job.level}</Label>
											</span>

											{langLabels}

											<div className="pull-right">
												<a href={"/job/" + job.name}>
													<Button bsStyle="success">View Job</Button>
												</a>
											</div>
											</Panel.Body>
										</Panel>
									</div>
								);
							}
						})}
					</Col>
				</Grid>
			</div>
		);
	}
}
export default withTracker(() => {
	const jobsHandle = Meteor.subscribe("jobs");
	const ready = jobsHandle.ready();
	return {
		dataIsReady: ready,
		jobs: ready ? Jobs.find({}).fetch() : []
	};
})(JobListings);

JobListings.propTypes = {
	dataIsReady: React.PropTypes.bool,
	jobs: React.PropTypes.array
};
