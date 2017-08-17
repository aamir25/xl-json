import React, { Component } from 'react';
import * as firebase from 'firebase';
var XLSX = require('np-xlsx');

require('../../css/button.css');

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.handleUpload = this.handleUpload.bind(this);
	}

	handleUpload(event) {
		event.preventDefault();

		let file = event.target.files[0];
		let storageRef = firebase.storage().ref(file.name);

		this.props.upload(file, storageRef);
	}

	render() {
		return (
			<div className = "divCenter">
				<div className = "fileUpload">
					<label htmlFor = "uploadBtn" className = "fileUploadLabel">Upload</label>
					<input onChange = {this.handleUpload} id = "uploadBtn" className = "fileUploadInput" type = "file" />
				</div>
			</div>
		);
	}
}