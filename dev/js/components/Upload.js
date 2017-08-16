import React, { Component } from 'react';
import * as firebase from 'firebase';
//xlsxj = require("xlsx-to-json");

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
		let uploadTask = storageRef.put(file);

		up
		console.log(event.target.files[0]);
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