import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Todo from './Todo'
import TodoApp from './TodoApp'
import TodoRedux from './TodoRedux/TodoRedux'
import Header from './Header'
import Auth from './Auth'
import Login from './Login'

class Routing extends Component {
	constructor(){
		super();
	}

	render() {
		return (
			  	<BrowserRouter>
			  		<Switch>
			    		<Auth>
			    			<Switch>
			     				<Route exact path='/' component={Home} />
			      				<Route exact path='/todo1' component={Todo} />
			      				<Route exact path='/todo2' component={TodoApp} />
			      				<Route exact path='/todo3' component={TodoRedux} />
			      			</Switch>
		    			</Auth>
		    		</Switch>
 				</BrowserRouter>
			);

	}
}

export default Routing


const Home = () => (
	<div>
		<Header />
		<br /><br /><br />
	</div>
);

