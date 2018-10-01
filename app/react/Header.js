import React, { Component } from 'react';
//import Link from 'react-router-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'



class Header extends Component {
	constructor(){
		super();
	}

	render() {
		return (
			<div id='Header' className='top' role='banner'>
			  	<div className="row header">
			        <div className="col-xs-12">
			            <Link to="/">TEST APP</Link>　　
			            <Link to="/todo1">TODOリスト１</Link>　　
			            <Link to="/todo2">TODOリスト２</Link>
			        </div>
			    </div>
			</div>
			);
	}
}
export default Header