import React, { Component } from 'react';
import * as firebase from 'firebase';
import JsonTable from 'react-json-table';

export default class Table extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data : []
		};
	}

	componentDidMount() {
		const dbRef = firebase.database().ref().child('cisco');
		
		dbRef.once('value', snapshot => {
			this.setState({
				data :snapshot.val()
			});
			console.log(this.state.data);
		}, error => {
			console.log(error);
		})
	}

	render() {
		let items = this.state.data;
		let columns = [
			" POTENTIAL REFRESH VALUE ",
	        "ACCOUNT NAME",
	        "AREA MANAGER",
	        "AREA NAME",
	        "ASSET AGE",
	        "BUCKETED COMPELLING EVENT DATE"
		];

		return (
			<JsonTable
			rows = { items }
			columns = { columns }
			/>
		);
	}
}