import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button,Alert, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';


import { LOGIN_REQUEST, LOGOUT } from '../../../actions/actionTypes';
import { setCookie } from '../../../utils/cookies';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      tokenValue: "",
      isLoginError: false
    }
    this.onLogin = this.onLogin.bind(this);
  }


  async onLogin() {
    await this.props.login(this.state.username,this.state.password);
  }

  render() {
    
    const token = this.props.token;
    if(token !== null){
      setCookie('token', token, 1);
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" onChange={e => this.setState({ username: e.target.value })} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={e => this.setState({ password: e.target.value })} />
                        
                      </InputGroup>
                      { (token === "error") &&
                        <Row>
                          <Col xs="12">
                            <Alert color="danger" className="mb-4">
                              <p>Username hoac password sai !</p>
                            </Alert>
                          </Col> 
                        </Row>
                      } 
                      { (token !== "error" && token !== null) &&
                        <Redirect to='/home' />
                      }
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.onLogin}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Epicor</h2>
                      <p>Website Epicor Live</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.login.token,
    status: state.login.status,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (user,pass) => dispatch({type:LOGIN_REQUEST, username : user, password : pass}),
    logout: () => dispatch({type:LOGOUT}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);