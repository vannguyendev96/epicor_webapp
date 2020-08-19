import React, { useState, useEffect } from 'react';

import {
    Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane,
    Card,
    CardBody,
    Button,
    CardHeader,
    FormGroup,
    Input,
    Table
} from 'reactstrap';

import { getCookie } from '../../utils/cookies';
import Pagination from '../Pagination/Pagination';

import { API_CUST } from '../../constant';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';


const options = [
    { value: 'all', label: 'Tất cả' },
    { value: 'approve', label: 'Cần được approve' },
    { value: 'done', label: 'Đã kiểm kê' }
]


function InventoryTransfer({ company, plant }) {

    const [dataSelect] = useState([
        { value: 'all', label: 'Tất cả' },
        { value: 'approve', label: 'Cần được approve' },
        { value: 'done', label: 'Đã kiểm kê' }
    ]);

    const [data, setData] = useState({ value: [] });
    const [query, setQuery] = useState('redux');

    const [selectData, setselectData] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token");
            if (token !== null) {
                let setting = '{"Company":"' + company + '","Plant":"' + plant + '"}';
                const parameters = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + token,
                        'Access-Control-Allow-Origin': '*',
                        'CallSettings': setting
                    },
                };
                const GetData_API_ENDPOINT = API_CUST + `BaqSvc/ADGetOnhandAsset_Mobile?$top=10`;

                await fetch(GetData_API_ENDPOINT, parameters)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setData(responseJson);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        };
        console.log(selectData)
        fetchData();
    }, [selectData]);



    return (
        <Row>
            <Col xs="12" sm="12">
                <Card>
                    <CardHeader>
                        <strong>Parameter</strong>
                    </CardHeader>
                    <CardBody>
                        <FormGroup row className="my-0">
                            <Col xs="4">
                                <FormGroup>
                                        <Select
                                            value={dataSelect.find(op => {
                                                return op.value === "all"
                                            })}
                                            options={dataSelect}
                                            onChange={ (selectedOption) => setselectData(selectedOption.value)}
                                        />
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Input type="text" id="invdate" placeholder="Search..." />
                                </FormGroup>
                            </Col>
                            <Col xs="2">
                                <FormGroup>
                                    <Button block outline active color="primary" aria-pressed="true" >View</Button>
                                    <ToastContainer />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Col>

            <Col xs="12" lg="12">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> Simple Table
                                </CardHeader>
                    <CardBody>
                        <div>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Part Num</th>
                                        <th>Part Description</th>
                                        <th>Plant</th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                                        {(data_Summary !== undefined) ?
                                            this.renderTable_Summary(data_Summary) : <tr><td></td></tr>}

                                    </tbody> */}
                                <tbody>
                                    {data.value.map(item => (
                                        <tr key={item.RowIdent}>
                                            <td>{item.PartWhse_PartNum}</td>
                                            <td>{item.Part_PartDescription}</td>
                                            <td>{item.Warehse_Plant}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>


                    </CardBody>
                </Card>
            </Col>
            {/* <Col xs="12" lg="12">
                {(totalRecord_Summary !== 0) && <div>
                    <Pagination totalRecords={totalRecord_Summary} pageLimit={limitRecord} pageNeighbours={1} onPageChanged={this.onPageChangedSummary} />
                </div>}
            </Col> */}
        </Row>
    );
}

const mapStateToProps = (state) => {
    return {
        company: state.SetCompanyPlant.company,
        plant: state.SetCompanyPlant.plant,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTransfer);