import React, { Component } from 'react';
import { firebaseDb } from '../firebase.js';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from './redux/actionCreators';

import Header from '../Header';
import TodoList from './component/TodoList';
import Form from './component/Form';

const todoRef = firebaseDb.collection('todo2');


class TodoApp extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.realtimeCatch();
	}

	realtimeCatch() {

    	todoRef.orderBy("created_at", "asc")
      	.onSnapshot(snapShot => {

  			this.props.updateTodo(snapShot);
  		});  	 

	}


	render() {
		return (
			<div className="todoApp">
				<Header />
				<div className="row">
            		<div className="col-xs-2"></div>
      				<div className="col-xs-8">
						<h2>TODO Redux</h2>
						<TodoList />
						<Form />
						<br /><br /><br />
					</div>
					<div className="col-xs-2"></div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return state.todo
}

const mapDispatchToProps = dispatch => {
  return {
    updateTodo: (snap) => dispatch(actions.updateTodo(snap)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoApp))

