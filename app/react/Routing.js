import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Todo from './Todo'
import TodoApp from './TodoApp'
import TodoRedux from './TodoRedux/TodoRedux'
import Header from './Header'

class Routing extends Component {
	constructor(){
		super();
	}

	render() {
		return (
			  	<BrowserRouter>
			    	<div>
			     		<Route exact path='/' component={Home} />
			      		<Route path='/todo1' component={Todo} />
			      		<Route path='/todo2' component={TodoApp} />
			      		<Route path='/todo3' component={TodoRedux} />
		    		</div>
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

