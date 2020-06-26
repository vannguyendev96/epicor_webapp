import React, { Component } from 'react';

import {
    Col, Row,
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    Button,
    Label
} from 'reactstrap';
import Select from 'react-select';

import { getCookie } from '../../utils/cookies';

import { connect } from 'react-redux';
import { GetCompanyPlant_REQUEST } from '../../actions/actionTypes';

import { API_CUST } from '../../constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            dataCompany: [],
            defaultCompany: "",
            dataPlant: [],
            defaultPlant: ""
        };

        this.saveCompanyPlant = this.saveCompanyPlant.bind(this);
    }

    async componentDidMount() {
        this.get_dataCompany();
        await this.getCurrent_CompanyPlant();
        this.get_dataPlant(this.state.defaultCompany);

        if (this.props.company === null && this.props.plant === null) {
            await this.props.onSetCompanyPlant(this.state.defaultCompany, this.state.defaultPlant);
        }
        await this.setData();

    }

    async setData() {
        await this.setState({
            defaultCompany: this.props.company
        })

        await this.get_dataPlant(this.props.company);
        this.setState({
            defaultPlant: this.props.plant
        })
    }

    //get company and plant current
    async getCurrent_CompanyPlant() {
        const token = getCookie("token");

        const parameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        };
        const GetData_API_ENDPOINT = API_CUST + 'Ice.Lib.SessionModSvc/GetCurrentValues';
        await fetch(GetData_API_ENDPOINT, parameters)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    defaultCompany: JSON.parse(JSON.stringify(responseJson.parameters.companyID)),
                    defaultPlant: JSON.parse(JSON.stringify(responseJson.parameters.siteID))
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    //get data company 
    get_dataCompany() {
        const token = getCookie("token");

        const parameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        };

        const GetData_API_ENDPOINT = API_CUST + 'Erp.BO.CompanySvc/List';
        fetch(GetData_API_ENDPOINT, parameters)
            .then((response) => response.json())
            .then((responseJson) => {
                var count = responseJson.value.length;
                console.log("count " + count)
                let drop_down_data = [];
                for (var i = 0; i < count; i++) {
                    drop_down_data.push({
                        value: responseJson.value[i].Company,
                        label: responseJson.value[i].Name
                    }); // Create your array of data              
                }

                this.setState({
                    dataCompany: drop_down_data
                })

            })
            .catch((error) => {
                console.log(error)
            })

    }

    //get data plant
    async get_dataPlant(company) {
        const token = getCookie("token");
        let setting = '{"Company":"' + company + '"}';
        const parameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
                'Access-Control-Allow-Origin': '*',
                'CallSettings': setting
            },
        };

        const GetData_API_ENDPOINT = API_CUST + 'Erp.BO.PlantSvc/Plants?$select=Plant1%2CName';
        await fetch(GetData_API_ENDPOINT, parameters)
            .then((response) => response.json())
            .then((responseJson) => {
                var count = responseJson.value.length;
                let drop_down_data = [];
                for (var i = 0; i < count; i++) {
                    drop_down_data.push({
                        value: responseJson.value[i].Plant1,
                        label: responseJson.value[i].Name
                    }); // Create your array of data              
                }
                this.setState({
                    dataPlant: drop_down_data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleChangeCompany = async selectedOption => {
        this.setState({
            defaultCompany: selectedOption.value
        })

        await this.get_dataPlant(selectedOption.value);
        this.setState({
            defaultPlant: this.state.dataPlant[0].value
        })
    };

    handleChangePlant = selectedOption => {
        this.setState({
            defaultPlant: selectedOption.value
        })
    };


    async saveCompanyPlant() {


        await this.props.onSetCompanyPlant(this.state.defaultCompany, this.state.defaultPlant);

        console.log("Company: " + this.props.company);
        console.log("Plant: " + this.props.plant);

        if(this.props.company !== "" && this.props.plant !== ""){
            toast.success("Lưu company và plant thành công !")
        }
    }

    render() {
        const { defaultCompany, defaultPlant } = this.state;

        return (
            <Row>
                <Col xs="12" sm="12">
                    <Card>
                        <CardHeader>
                            <strong>Setting</strong>
                        </CardHeader>
                        <CardBody>
                            <FormGroup row className="my-0">
                                <Col md="1">
                                    <FormGroup>
                                        <Label htmlFor="city">Company</Label>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Select
                                            value={this.state.dataCompany.find(op => {
                                                return op.value === defaultCompany
                                            })}
                                            onChange={this.handleChangeCompany}
                                            options={this.state.dataCompany}
                                        />
                                    </FormGroup>
                                </Col>


                            </FormGroup>

                            <FormGroup row className="my-0">
                                <Col md="1">
                                    <FormGroup>
                                        <Label htmlFor="city">Plant</Label>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Select
                                            value={this.state.dataPlant.find(op => {
                                                return op.value === defaultPlant
                                            })}
                                            onChange={this.handleChangePlant}
                                            options={this.state.dataPlant}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <FormGroup>
                                        <Button block outline active color="primary" aria-pressed="true" onClick={this.saveCompanyPlant}>Save</Button>                       
                                        <ToastContainer />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>


            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        company: state.SetCompanyPlant.company,
        plant: state.SetCompanyPlant.plant,
        userinfo: state.login.userinfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        onSetCompanyPlant: (company, plant) => dispatch({ type: GetCompanyPlant_REQUEST, company: company, plant: plant }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);