import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from 'firebase/app';
import 'firebase/auth';
import * as actions from './TodoRedux/redux/actionCreators';
import Login from './Login'


class Auth extends Component {
	constructor(props){
		super(props);
	}



	render(){
		if(this.props.auth.currentUser.isLoggedIn){
			console.log("AAAA");
			return this.props.children;
		}else{
			console.log("BBBB");
			return(<Login />);
		}
	}
}


function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Auth)