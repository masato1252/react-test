import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as actions from './TodoRedux/redux/actionCreators';

class Login extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.props.refLogin();
	}

	render(){
		console.log(this.props);
		return(
			<div>
				<br /><br />
			  	<div className="row header">
			  		<div className="col-xs-2"></div>
			        <div className="col-xs-8">
			        	<h3>Googleログイン</h3>
						<button className="btn btn-success" onClick={this.props.doLogin}>Login</button>
					</div>
					<div className="col-xs-2"></div>
				</div>
				<br /><br /><br /><br />
			</div>
		)
	}
}

function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: () => {
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
    },
    refLogin: () => {
		firebase.auth().onAuthStateChanged( function(user){
        	if (user) {
          		dispatch(actions.loginOk(user));
        	}
    	})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

