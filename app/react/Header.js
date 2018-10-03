import React, { Component } from 'react';
import { BrowserRouter, Route, Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import firebase from 'firebase/app';
import 'firebase/auth';
import * as actions from './TodoRedux/redux/actionCreators';


class Header extends Component {
	constructor(props){
		super(props);
	}

	render() {
		console.log(this.props);
		return (
			<div id='Header' className='top' role='banner'>
			  	<div className="row header">
			        <div className="col-xs-12">
			        	こんにちは、{this.props.auth.currentUser.user_name} さん<br />
			            <Link to="/">TOPページ</Link>　　
			            <Link to="/todo1">TODOリスト１</Link>　　
			            <Link to="/todo2">TODOリスト２</Link>　　
			            <Link to="/todo3">TODOリスト(Redux版)</Link>　　　　　
			            <button className="btn btn-danger" onClick={this.props.doLogout}>ログアウト</button>
			        </div>
			    </div>
			</div>
			);
	}
}


function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogout: () => {
    	firebase.auth().signOut()
    	dispatch(actions.logOut());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))