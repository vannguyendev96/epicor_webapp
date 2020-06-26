import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://www.patc.com.vn/">PATC</a> &copy; DMS Company.</span>
        <span className="ml-auto">V.4.0.0 {this.props.userinfo} <a href="https://www.patc.com.vn/">Epicor Cust</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

//export default DefaultFooter;

const mapStateToProps = (state) => {
	return {
		company: state.SetCompanyPlant.company,
    plant: state.SetCompanyPlant.plant,
    userinfo: state.login.userinfo,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultFooter);