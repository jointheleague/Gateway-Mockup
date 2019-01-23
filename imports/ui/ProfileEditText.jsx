import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
	Button, FormControl
} from 'react-bootstrap';

export default class ProfileEditText extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ' ',
			saved: true,
			isEditMode: false
		};

		this.onSaveText = this.onSaveText.bind(this);
		this.onEditText = this.onEditText.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);

		Meteor.call('profile.getTextField', this.props.username, this.props.fieldName, (error, text) => {
			this.setState({
				text
			});
		});
	}

	onKeyPress(e) {
		if (e.key === 'Enter') {
			this.onSaveText();
		}
	}

	onSaveText() {
		this.setState({ saved: false });
		Meteor.call('profile.setTextField', this.props.fieldName, this.state.text, (error) => {
			Meteor.call('profile.getTextField', this.props.username, this.props.fieldName, (error, text) => {
				this.setState({
					text,
					saved: true
				});
			});
		});
		this.setState({ isEditMode: false });
	}

	onEditText() {
		this.setState({ isEditMode: true });
	}

	onChangeText(info) {
		this.setState({
			text: info.target.value
		});
	}

	render() {
		const placeHolderText = this.props.showFullPlaceholder ? `Click to add ${this.props.placeholder}` : this.props.placeholder;
		if (this.state.text == ' ') {
			return (
				<div>
          			Loading...
				</div>
			);
		} if (this.state.isEditMode) {
			return (
				<div>
					<FormControl
						type="text"
						value={this.state.text}
						placeholder={this.props.placeholder}
						onChange={this.onChangeText}
						onKeyPress={this.onKeyPress}
					/>
					<div style={{ paddingTop: '4px' }}>
						<Button onClick={this.onSaveText} bsStyle="primary" bsSize="xsmall">Save</Button>
					</div>
				</div>
			);
		} if (this.state.text == '') {
			return (
				<div>
					{placeHolderText}
					{' '}
					<img src="/images/EditPencil.svg" width="20px;" onClick={this.onEditText} />
				</div>
			);
		} if (this.props.isEditable) {
			return (
				<div>
					{this.state.text}
					{' '}
					<img src="/images/EditPencil.svg" width="20px;" onClick={this.onEditText} />
				</div>
			);
		}
		return (
			<div>
				{this.state.text}
			</div>
		);
	}
}
