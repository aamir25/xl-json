import React, { Component } from 'react';
import * as firebase from 'firebase';
import JsonTable from 'react-json-table';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-md-spinner';

import { getData } from '../actions/tableActions';

class Table extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data : [],
			activePage : 1
		};

		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange(pageNumber) {
    	this.setState({activePage: pageNumber});
  	}

	componentDidMount() {
		const dbRef = firebase.database().ref().child('cisco');
		
		this.props.getData(dbRef);		
	}

	render() {
		let {
			data,
			error,
			isLoading
		} = this.props.table

		let style = {
			"whiteSpace" : "nowrap"
		};

		let loaderStyle = {
 			"position" 	: "absolute",
		    "top" 		: "0",
    		"bottom"	: "0",
    		"left"		: "0",
    		"right"		: "0",
		    "margin"	: "auto"
 		};


		let { activePage } = this.state;		
	    
	    let indexOfLastData = activePage * 15;
	    let indexOfFirstData = indexOfLastData - 15;
	    let currentDatas = data.slice(indexOfFirstData, indexOfLastData);
		
		let items = currentDatas;
		let columns = [
			" POTENTIAL REFRESH VALUE ",
	        "ACCOUNT NAME",
	        "AREA MANAGER",
	        "AREA NAME",
	        "ASSET AGE",
	        "BUCKETED COMPELLING EVENT DATE"
		];

		return (
			<div>
				{
					isLoading ?
					<Spinner style={loaderStyle} size="50"/> :
					<div style = {{"padding" : "10px"}} >
						<JsonTable
						rows = { items }
						columns = { columns }
						className = "table table-bordered table-hover table-responsive"
						/>
						<div className="text-center">
							<Pagination
						    activePage = {this.state.activePage}
						    itemsCountPerPage = {15}
						    totalItemsCount = {data.length}
						    pageRangeDisplayed = {15}
						    onChange = {this.handlePageChange}
						    />
					    </div>
					</div>
				}
		    </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		table : state.table
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		getData : getData
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Table);