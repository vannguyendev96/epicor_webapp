import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Alert, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
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
    await this.props.login(this.state.username, this.state.password);
    //setCookie('token', this.props.token, 1);
    this.props.history.push('/home')
  }

  render() {

    const token = this.props.token;
    if (token !== null) {
      setCookie('token', token, 1);
      localStorage.setItem('userinfo', this.state.username);
    }

    console.log(token)

    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="assets/img/img-01.png" alt="IMG" />
            </div>
            <form className="login100-form validate-form">
              <span className="login100-form-title">
                Member Login
              </span>

              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email" onChange={e => this.setState({ username: e.target.value })} />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true" />
                </span>
              </div>


              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="pass" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>


              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={this.onLogin}>
                  Login
                </button>
              </div>
              {(token === "error") &&
                <div className="container-login100-form-btn">
                  <Row>
                    <Col xs="12">
                      <Alert color="danger" className="mb-4">
                        <p>Username hoac password sai !</p>
                      </Alert>
                    </Col>
                  </Row>
                </div>

              }
              {(token !== "error" && token !== null) &&
                <Redirect to='/home' />
              }

            </form>
          </div>
        </div>
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
    login: (user, pass) => dispatch({ type: LOGIN_REQUEST, username: user, password: pass }),
    logout: () => dispatch({ type: LOGOUT }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);