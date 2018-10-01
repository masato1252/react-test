import React, { Component } from 'react';
import { firebaseDb } from './firebase.js';
import Header from './Header'

const todoRef = firebaseDb.collection('todo1');

class Input extends Component {
	constructor(props){
		super(props);
		this.addTodo = this.addTodo.bind(this);
	}

	addTodo() {
		if(!this.refs.title.value || this.refs.title.value==""){
			alert("入力してください。");
			return;
		}
		this.props.addTodo(this.refs.title.value);
		this.refs.title.value = "";
	}

	render() {
		return(
			<div>
          		<input type="text" ref="title" />
          		<input type="button" value="追加" onClick={this.addTodo} />
          	</div>
		);
	}

}

class List extends Component {
	constructor(props){
		super(props);

	}

	render(){
		return (
			<ul>
			{
				this.props.todo.map( (todo, i) => {
					return <li key={i}> <input type="button" value="削除" onClick={ () => this.props.deleteTodo(todo.id)} /> {todo.title}</li>
				})
			}
			</ul>
		);
	}

}


class Todo extends Component {
	constructor(){
		super();
		this.state = {
			todo:[]
		};
		this.addTodo = this.addTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.getTodoData = this.getTodoData.bind(this);
		this.realtimeCatch = this.realtimeCatch.bind(this);

	}

	componentDidMount() {
		this.realtimeCatch();
	}

	realtimeCatch() {
		
		todoRef.orderBy("created_at", "asc")
			.onSnapshot(snapShot => {
				this.state.todo = [];
		        snapShot.forEach(doc => {
		          this.state.todo.push({
		            title : doc.data().title,
		            id: doc.id
		          });
		        });

				this.setState({
					todo: this.state.todo
				});
			});
	}

	getTodoData() {
		todoRef.orderBy("created_at", "asc")
			.get()
			.then(snapShot => {
				this.state.todo = [];
		        snapShot.forEach(doc => {
		          this.state.todo.push({
		            title : doc.data().title,
		            id: doc.id
		          });
		        });

				this.setState({
					todo: this.state.todo
				});
			});
	}

	addTodo(value){

		todoRef.add({
			title: value,
			created_at: new Date()
		}).then(() => {
			this.getTodoData();
		});

		// this.state.todo.push({
		// 	title: value
		// });

		// this.setState({
		// 	todo: this.state.todo
		// });

	}

	deleteTodo(id){

		todoRef.doc(id)
			.delete();

		// this.state.todo.splice(i,1);

		// this.setState({
		// 	todo: this.state.todo
		// });
	}

  render() {
    return (
        <div className="Todo">
        	<Header />
            <div className="row">
            	<div className="col-xs-2"></div>
      			<div className="col-xs-8">
      				<h2>TODOアプリ</h2>
      				<List todo={this.state.todo} deleteTodo={this.deleteTodo} />
      				<Input addTodo={this.addTodo} />
      			</div>
      			<div className="col-xs-2"></div>
      		</div>
      		<br /><br /><br />
        </div>
    	);
	}
}
export default Todo;