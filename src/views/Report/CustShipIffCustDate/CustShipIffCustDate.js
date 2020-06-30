import React, { Component } from 'react';

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

import { getCookie } from '../../../utils/cookies';
import Pagination from '../../Pagination/Pagination';

import { API_CUST } from '../../../constant';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CustShipIffCustDate extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onViewData = this.onViewData.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);

        this.state = {
            activeTab: new Array(4).fill('1'),
            invDate: null,
            shipDate: null,
            data_glAccountShipNotInvoice: [],
            totalRecord_glAccountShipNotInvoice: 0,
            limitRecord: 10,
            currenPage: 0,
            isLoading: false,
            isLoadingCustShip: false,
            data_CustShip: [],
            totalRecord_CustShip: 0,
            isLoadingSummary: false,
            data_Summary: [],
            totalRecord_Summary: 0,
            permission: false
        };
    }

   
    async componentDidMount(){  
        await this.check_Permission();
    }

    //check permission
    async check_Permission(){
        const token = getCookie("token");
        const username = localStorage.getItem('username');
        const parameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        };

        const GetData_API_ENDPOINT = API_CUST + `Ice.BO.SecuritySvc/Securities?$select=AllowAccess&$filter=SecCode%20eq%20'web_app'`;
        await fetch(GetData_API_ENDPOINT, parameters)
            .then((response) => response.json())
            .then((responseJson) => {
                var groupList = responseJson.value[0].AllowAccess;
                if (groupList.includes(username) == true) {
                   this.setState({ permission : true})
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }

    //view all
    async onViewData(page) {
        if ((this.state.shipDate === null) || (this.state.invDate === null)) {
            toast.error("Vui lòng chọn ngày inv date và ngày ship date !")
        }
        else {
            this.setState({
                isLoading: true,
                isLoadingCustShip: true,
                isLoadingSummary: true
            })
            if (page === 1) {
                const totalRecord_Summary = await this.get_totalSummary();
                this.setState({
                    totalRecord_Summary: totalRecord_Summary
                })
            }
            this.getdata_Summary(1);

            if (page === 1) {
                const totalRecord = await this.getTotal_glAccountShipNotInvoice();
                this.setState({
                    totalRecord_glAccountShipNotInvoice: totalRecord
                })
            }
            this.getdata_glAccountShipNotInvoice(1);

            if (page === 1) {
                const totalRecord_CustShip = await this.getTotal_CustShip();
                this.setState({
                    totalRecord_CustShip: totalRecord_CustShip
                })
            }
            this.getdata_CustShip(1);

            
            
            
        }
    }

    //get total gl account
    async getTotal_glAccountShipNotInvoice() {
        let resutl = 0;
        let setting = '{"Company":"' + this.props.company + '","Plant":"' + this.props.plant + '"}';
        const GetData_API_ENDPOINT = API_CUST + `BaqSvc/GLAccountShipNotInvoice/?CutOffDateShipDate=${this.state.shipDate}&$select=RowIdent`;
        const token = getCookie("token");

        const parameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
                'Access-Control-Allow-Origin': '*',
                'CallSettings': setting
            },
        };

        await fetch(GetData_API_ENDPOINT, parameters)
            .then((response) => response.json())
            .then((responseJson) => {
                resutl = responseJson.value.length
            })
            .catch((error) => {
                console.log(error)
            })
        return resutl;
    }

    //get data top 10 with current page
    getdata_glAccountShipNotInvoice(page) {
        if (this.state.shipDate !== null) {
            let setting = '{"Company":"' + this.props.company + '","Plant":"' + this.props.plant + '"}';
            const skip = (((this.state.limitRecord * page) - this.state.limitRecord) > 0) ? ((this.state.limitRecord * page) - this.state.limitRecord) : 0;
            const GetData_API_ENDPOINT = API_CUST + `BaqSvc/GLAccountShipNotInvoice/?CutOffDateShipDate=${this.state.shipDate}&$top=${10}&$skip=${skip}`;
            const token = getCookie("token");

            const parameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + token,
                    'Access-Control-Allow-Origin': '*',
                    'CallSettings': setting
                },
            };
            fetch(GetData_API_ENDPOINT, parameters)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data_glAccountShipNotInvoice: responseJson.value,
                        isLoading: false,

                    })
                })
                .catch((error) => {
                    this.setState({
                        isLoading: false,

                    })
                })
        }
        else {
            this.setState({
                isLoading: false,
            })
        }

    }

    //render glAccountShipNotInvoice => table 
    renderTable_glAccountShipNotInvoice(data) {
        return data.map((dataList, index) => {
            const { GLJrnDtl_Character07, Customer_Name, Calculated_BookDebitAmount, Calculated_BookCreditAmount, Calculated_GLRevenue, RowIdent } = dataList //destructuring
            return (
                <tr key={RowIdent}>
                    <td>{GLJrnDtl_Character07}</td>
                    <td>{Customer_Name}</td>
                    <td>{Calculated_BookDebitAmount}</td>
                    <td>{Calculated_BookCreditAmount}</td>
                    <td>{Calculated_GLRevenue}</td>
                </tr>
            )
        })
    }

    //click page view data Gl account
    onPageChanged = data => {

        const { currentPage } = data;
        this.setState({ isLoading: true })
        this.getdata_glAccountShipNotInvoice(currentPage);
    }

    //get data cust ship top 10 with current page
    getdata_CustShip(page) {
        if ((this.state.shipDate !== null) && (this.state.invDate !== null)) {
            let setting = '{"Company":"' + this.props.company + '","Plant":"' + this.props.plant + '"}';
            const skip = (((this.state.limitRecord * page) - this.state.limitRecord) > 0) ? ((this.state.limitRecord * page) - this.state.limitRecord) : 0;
            const GetData_API_ENDPOINT = API_CUST + `BaqSvc/CustShipbydateNEW/?CutOffDateInvDate=${this.state.invDate}&CutOffDateShipDate=${this.state.shipDate}&$select=ShipHead_Plant%2CShipDtl_PackNum%2CShipDtl_PackLine%2CShipHead_ShipDate%2CRowIdent%2CCustomer_CustID%2CCustomer_Name&$top=${10}&$skip=${skip}`;
            const token = getCookie("token");

            const parameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + token,
                    'Access-Control-Allow-Origin': '*',
                    'CallSettings': setting
                },
            };
            fetch(GetData_API_ENDPOINT, parameters)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data_CustShip: responseJson.value,
                        isLoadingCustShip: false,

                    })
                })
                .catch((error) => {
                    this.setState({
                        isLoadingCustShip: false,

                    })
                })
        }
        else {
            this.setState({
                isLoadingCustShip: false,
            })
        }
    }

    //get total cust ship
    async getTotal_CustShip() {
        let resutl = 0;
        let setting = '{"Company":"' + this.props.company + '","Plant":"' + this.props.plant + '"}';
        const GetData_API_ENDPOINT = API_CUST + `BaqSvc/CustShipbydateNEW/?CutOffDateInvDate=${this.state.invDate}&CutOffDateShipDate=${this.state.shipDate}&$select=RowIdent`;
        const token = getCookie("token");

        const parameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
                'Access-Control-Allow-Origin': '*',
                'CallSettings': setting
            },
        };

        await fetch(GetData_API_ENDPOINT, parameters)
            .then((response) => response.json())
            .then((responseJson) => {
                resutl = responseJson.value.length
            })
            .catch((error) => {
                console.log(error)
            })
        return resutl;
    }

    //render glAccountShipNotInvoice => table 
    renderTable_CustShip(data) {
        return data.map((dataList, index) => {
            const { ShipHead_Plant, ShipDtl_PackNum, ShipDtl_PackLine, ShipHead_ShipDate,
                Customer_CustID, Customer_Name, RowIdent } = dataList //destructuring
            return (
                <tr key={RowIdent}>
                    <td>{Customer_CustID}</td>
                    <td>{Customer_Name}</td>
                    <td>{ShipHead_Plant}</td>
                    <td>{ShipDtl_PackNum}</td>
                    <td>{ShipDtl_PackLine}</td>
                    <td>{ShipHead_ShipDate}</td>
                </tr>
            )
        })
    }

    onPageChangedCustShip = data => {
        const { currentPage } = data;
        this.setState({ isLoadingCustShip: true })
        this.getdata_CustShip(currentPage);
    }

    //tab summary
    async get_totalSummary() {
        let resutl = 0;
        let setting = '{"Company":"' + this.props.company + '","Plant":"' + this.props.plant + '"}';
        const GetData_API_ENDPOINT = API_CUST + `BaqSvc/CustShipbydateSum/?CutOffDateInvDate=${this.state.invDate}&CutOffDateShipDate=${this.state.shipDate}&$select=RowIdent`;
        const token = getCookie("token");

        const parameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
                'Access-Control-Allow-Origin': '*',
                'CallSettings': setting
            },
        };

        await fetch(GetData_API_ENDPOINT, parameters)
            .then((response) => response.json())
            .then((responseJson) => {
                resutl = responseJson.value.length
            })
            .catch((error) => {
                console.log(error)
            })
        return resutl;
    }

    getdata_Summary(page) {
        if ((this.state.shipDate !== null) && (this.state.invDate !== null)) {
            let setting = '{"Company":"' + this.props.company + '","Plant":"' + this.props.plant + '"}';
            const skip = (((this.state.limitRecord * page) - this.state.limitRecord) > 0) ? ((this.state.limitRecord * page) - this.state.limitRecord) : 0;
            const GetData_API_ENDPOINT = API_CUST + `BaqSvc/CustShipbydateSum/?CutOffDateInvDate=${this.state.invDate}&CutOffDateShipDate=${this.state.shipDate}&$top=${10}&$skip=${skip}`;
            const token = getCookie("token");

            const parameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + token,
                    'Access-Control-Allow-Origin': '*',
                    'CallSettings': setting
                },
            };
            fetch(GetData_API_ENDPOINT, parameters)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        data_Summary: responseJson.value,
                        isLoadingSummary: false,

                    })
                })
                .catch((error) => {
                    this.setState({
                        isLoadingSummary: false,
                    })
                })
        }
        else {
            this.setState({
                isLoadingSummary: false,
            })
        }
    }

    //render summary => table 
    renderTable_Summary(data) {
        return data.map((dataList, index) => {
            const { Customer_CustID, Customer_Name, Calculated_SumExtPrice, Calculated_SumStdAmount, Calculated_SumExtCost, RowIdent } = dataList //destructuring
            return (
                <tr key={RowIdent}>
                    <td>{Customer_CustID}</td>
                    <td>{Customer_Name}</td>
                    <td>{Calculated_SumExtPrice}</td>
                    <td>{Calculated_SumStdAmount}</td>
                    <td>{Calculated_SumExtCost}</td>
                </tr>
            )
        })
    }

    onPageChangedSummary = data => {
        const { currentPage } = data;
        this.setState({ isLoadingSummary: true })
        this.getdata_Summary(currentPage);
    }


    tabPane() {
        const { data_glAccountShipNotInvoice, isLoading, totalRecord_glAccountShipNotInvoice,
            limitRecord, data_CustShip, isLoadingCustShip, totalRecord_CustShip,
            data_Summary, isLoadingSummary, totalRecord_Summary } = this.state;
        return (
            <>
                <TabPane tabId="1">
                    <Row>
                        <Col xs="12" sm="12">
                            <Card>
                                <CardHeader>
                                    <strong>Parameter</strong>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row className="my-0">
                                        <Col md="4">
                                            <FormGroup>
                                                <Input type="text" id="packnum" placeholder="Pack Num" />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Input type="date" id="invdate" placeholder="Cut Off Date Inv Date" onChange={e => this.setState({ invDate: e.target.value })} />
                                            </FormGroup>
                                        </Col>

                                    </FormGroup>

                                    <FormGroup row className="my-0">
                                        <Col md="4">
                                            <FormGroup>
                                                <Input type="text" id="customerid" placeholder="Customer ID" />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Input type="date" id="shipdate" placeholder="Cut Off Date Ship Date" onChange={e => this.setState({ shipDate: e.target.value })} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="2">
                                            <FormGroup>
                                                <Button block outline active color="primary" aria-pressed="true" onClick={() => this.onViewData(1)} >View</Button>
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
                                    {isLoadingSummary ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                                        <div>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>CustID</th>
                                                        <th>Name</th>
                                                        <th>Ext.Price</th>
                                                        <th>Std Amount</th>
                                                        <th>Act Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(data_Summary !== undefined) ?
                                                        this.renderTable_Summary(data_Summary) : <tr><td></td></tr>}

                                                </tbody>
                                            </Table>
                                        </div>
                                    }


                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" lg="12">
                            {(totalRecord_Summary !== 0) && <div>
                                <Pagination totalRecords={totalRecord_Summary} pageLimit={limitRecord} pageNeighbours={1} onPageChanged={this.onPageChangedSummary} />
                            </div>}
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <div className="animated fadeIn">
                        <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                    <CardHeader>
                                        <i className="fa fa-align-justify"></i>Cust Ship
                                            </CardHeader>
                                    <CardBody>
                                        {isLoadingCustShip ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                                            <div>
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>CustID</th>
                                                            <th>Name</th>
                                                            <th>Plant</th>
                                                            <th>PackNum</th>
                                                            <th>PackLine</th>
                                                            <th>ShipDate</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(data_CustShip !== undefined) ?
                                                            this.renderTable_CustShip(data_CustShip) : <tr><td></td></tr>}

                                                    </tbody>
                                                </Table>
                                            </div>
                                        }




                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs="12" lg="12">
                                {(totalRecord_CustShip !== 0) && <div>
                                    <Pagination totalRecords={totalRecord_CustShip} pageLimit={limitRecord} pageNeighbours={1} onPageChanged={this.onPageChangedCustShip} />
                                </div>}
                            </Col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <div className="animated fadeIn">
                        <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                    <CardHeader>
                                        <i className="fa fa-align-justify"></i>GL Account Ship Not Invoice
                                        </CardHeader>
                                    <CardBody>
                                        {isLoading ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                                            <div>
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>Character07</th>
                                                            <th>Name</th>
                                                            <th>BookDebitAmount</th>
                                                            <th>BookCreditAmount</th>
                                                            <th>GLRevenue</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(data_glAccountShipNotInvoice !== undefined) ?
                                                            this.renderTable_glAccountShipNotInvoice(data_glAccountShipNotInvoice) : <tr><td></td></tr>}

                                                    </tbody>
                                                </Table>
                                            </div>
                                        }
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs="12" lg="12">
                                {(totalRecord_glAccountShipNotInvoice !== 0) && <div>
                                    <Pagination totalRecords={totalRecord_glAccountShipNotInvoice} pageLimit={limitRecord} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                                </div>}
                            </Col>
                        </Row>


                    </div>

                </TabPane>
            </>
        );
    }

    render() {
        const { permission } = this.state;
        if(!permission){
            return(
                <div>Bạn không có quyền vào màn hình này!</div>
            )
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '1'}
                                    onClick={() => { this.toggle(0, '1'); }}
                                >
                                    Summary
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '2'}
                                    onClick={() => { this.toggle(0, '2'); }}
                                >
                                    CustShipbydateNEW
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '3'}
                                    onClick={() => { this.toggle(0, '3'); }}
                                >
                                    GLAccount Ship Not Invoice
                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            {this.tabPane()}
                        </TabContent>
                    </Col>
                </Row>
            </div>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CustShipIffCustDate);