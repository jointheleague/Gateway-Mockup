import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import classnames from "classnames";
import AppNavbar from "./AppNavbar";
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

// TrackerReact is imported (default) with Meteor 1.3 new module system
import TrackerReact from "meteor/ultimatejs:tracker-react";

// Get the Collection
Jobs = new Mongo.Collection("jobs");

function FieldGroup({ id, label, help, ...props }) {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
		</FormGroup>
	);
}

export default class JobListings extends TrackerReact(React.Component) {
	constructor() {
		super();
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
			search: ""
		};
		this.langSelected = this.langSelected.bind(this);
		this.levelRangeChanged = this.levelRangeChanged.bind(this);
		this.searchChanged = this.searchChanged.bind(this);
	}

	levelRangeChanged(ev) {
		if (ev.target.dataset.limit === "upper") {
			this.setState({ upperLevelFilter: ev.target.value });
		} else if (ev.target.dataset.limit === "lower") {
			this.setState({ lowerLevelFilter: ev.target.value });
		}
	}

	searchChanged(ev) {
		this.setState({ search: ev.target.value.trim() });
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
		return Jobs.find({}).fetch();
	}

	render() {
		const languageList = this.state.languages.map(value => {
			return (
				<div key={value} style={{ fontSize: 16 + "px" }}>
					<input
						type="checkbox"
						onChange={this.langSelected}
						data-lang={value}
						aria-label="..."
					/>&nbsp;{value}
				</div>
			);
		});
		return (
			<div>
				<Grid>
					<Col md={4}>
						<div style={{ margin: "auto" }}>
							<h2> Filters </h2>
						</div>
						<Panel>
							<fieldset>
								<legend> Languages </legend>
								{languageList}
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
						</Panel>
					</Col>
					<Col md={8}>
						<div style={{ margin: "auto" }}>
							<h2 id="pageTitle"> Job Listings </h2>
						</div>
						<FormControl type="text" placeholder="search for jobs..." style={{ "paddingBottom": "10px" }} onChange={this.searchChanged} />
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

							if(this.state.search != "") {
								var lower1 = job.name.toLowerCase();
								var lower2 = this.state.search.toLowerCase();
								if(lower1.indexOf(lower2) !== -1) {
									validSearch = true;
								}
							} else {
								validSearch = true;
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
											<h3> {job.name} </h3>
											<div className="currentTextDisabledSmall">
												{" "}
												Posted By <a href="#"> {job.client} </a>{" "}
											</div>
											<p> {job.desc} </p>
											<br />
											<span style={{ paddingRight: "5px" }}>
												<Label bsStyle="primary">Lv. {job.level}</Label>
											</span>

											{langLabels}

											<div className="pull-right">
												<Button bsStyle="success">View Job</Button>
											</div>
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
