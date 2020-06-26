import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getNewAction } from '../../../actions';

import { Card,CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {  getCookie } from '../../../utils/cookies';
import Pagination from '../../Pagination/Pagination'

class Colors extends Component {

	render(){
        return(
            <h5>Home</h5>
        )
    }
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		dataList: [],
	// 		alldataList: [],
	// 		isLoading: true,
	// 		totalRecordData: 0,
	// 		limitRecord: 10,
	// 		currenPage: 0
	// 	}

	// }

	// //loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

	// async componentDidMount() {
	// 	//this.props.onGetData();
	// 	const totalRecord = await this.getTotalRecord();
	// 	this.setState({
	// 		totalRecordData: totalRecord
	// 	})

	// 	this.getdataPart(1);

	// 	console.log("Company: " + this.props.company);
    //     console.log("Plant: " + this.props.plant);
	// }

	// //get total record
	// async getTotalRecord() {
	// 	let resutl = 0;
	// 	const GetData_API_ENDPOINT = 'https://dev.dmsc.com.vn/CustPATC/api/v1/Erp.BO.PartSvc/Parts?$select=PartNum%2CPartDescription%2CSysRevID&$top=100';
	// 	const token = getCookie("token");

	// 	const parameters = {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Authorization': 'Basic ' + token,
	// 			'Access-Control-Allow-Origin': '*',
	// 		},
	// 	};
	// 	await fetch(GetData_API_ENDPOINT, parameters)
	// 		.then((response) => response.json())
	// 		.then((responseJson) => {
	// 			// this.setState({
	// 			// 	alldataList: responseJson.value
	// 			// })
	// 			resutl = responseJson.value.length
	// 		})
	// 		.catch((error) => {
	// 			console.log(error)
	// 		})
	// 	return resutl;
	// }

	// //get data from api
	// getdataPart(page) {
	// 	const skip = (((this.state.limitRecord * page) - this.state.limitRecord)>0) ? ((this.state.limitRecord * page) - this.state.limitRecord) : 0;
	// 	const GetData_API_ENDPOINT = `https://dev.dmsc.com.vn/CustPATC/api/v1/Erp.BO.PartSvc/Parts?$select=PartNum%2CPartDescription%2CSysRevID&$top=${10}&$skip=${skip}`;
	// 	const token = getCookie("token");

	// 	const parameters = {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Authorization': 'Basic ' + token,
	// 			'Access-Control-Allow-Origin': '*',
	// 		},
	// 	};
	// 	fetch(GetData_API_ENDPOINT, parameters)
	// 		.then((response) => response.json())
	// 		.then((responseJson) => {
	// 			this.setState({
	// 				dataList: responseJson.value,
	// 				isLoading: false
	// 			})
	// 		})
	// 		.catch((error) => {
	// 			console.log(error)
	// 		})
	// }


	// //render part => table 
	// renderTableData(data) {
	// 	return data.map((dataList, index) => {
	// 		const { SysRevID, PartNum, PartDescription } = dataList //destructuring
	// 		return (
	// 			<tr key={SysRevID}>
	// 				<td>{PartNum}</td>
	// 				<td>{PartDescription}</td>
	// 			</tr>
	// 		)
	// 	})
	// }



	// onPageChanged = data => {
	// 	const { currentPage } = data;
	// 	this.getdataPart(currentPage);
	// }

	// render() {
	// 	const { dataList,totalRecordData,limitRecord,isLoading } = this.state;
	// 	if (isLoading) {
	// 		return (
	// 			<div className="animated fadeIn pt-1 text-center">Loading...</div>
	// 		)
	// 	}
	// 	else {
	// 		//const dataList = JSON.stringify(this.props.data);
	// 		return (
	// 			<div className="animated fadeIn">
	// 				<Row>
	// 					<Col xs="12" lg="12">
	// 						<Card>
	// 							<CardHeader>
	// 								<i className="fa fa-align-justify"></i> Simple Table
	// 							  </CardHeader>
	// 							<CardBody>
	// 								<Table responsive>
	// 									<thead>
	// 										<tr>
	// 											<th>PartNum</th>
	// 											<th>Part Description</th>
	// 										</tr>
	// 									</thead>
	// 									<tbody>
	// 										{this.renderTableData(dataList)}

	// 									</tbody>
	// 								</Table>
	// 								<div>
	// 									<Pagination totalRecords={totalRecordData} pageLimit={limitRecord} pageNeighbours={1} onPageChanged={this.onPageChanged} />
	// 								</div>
	// 							</CardBody>
	// 						</Card>
	// 					</Col>
	// 				</Row>
	// 			</div>
	// 		)
	// 	}

	// }
}

const mapStateToProps = (state) => {
	return {
		data: state.getdataReducers.data,
		isLoading: state.getdataReducers.isLoading,
		company: state.SetCompanyPlant.company,
		plant: state.SetCompanyPlant.plant,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onGetData: () => {
			dispatch(getNewAction());
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Colors);

