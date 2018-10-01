import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Todo from './Todo'
import TodoApp from './TodoApp'
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

// const Header = () => (
// 	<div id='Header' className='top' role='banner'>
// 	  	<div className="row header">
// 	        <div className="col-xs-12">
// 	            <Link to="/">TEST APP</Link>　　
// 	            <Link to="/todo1">TODOリスト１</Link>　　
// 	            <Link to="/todo2">TODOリスト２</Link>
// 	        </div>
// 	    </div>
// 	</div>
// )