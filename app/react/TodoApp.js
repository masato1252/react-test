import React, { Component } from 'react';
import { firebaseDb } from './firebase.js';
import Header from './Header'

const todoRef = firebaseDb.collection('todo2');

class TodoList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{ this.props.todo.map( (todo, i) => {
						if(!todo.done){
							return <div key={i} className="panel panel-success">
							  <div className="panel-heading">{todo.title}</div>
							  <div className="panel-body">
							    <p>内容：{todo.desc}</p>
							    <p>登録日：{todo.created_at}</p>
							    <br />
							    <button onClick={ () => this.props.updateState(todo.id, 1) }>完了</button>　　
							    <button onClick={ () => this.props.deleteTodo(todo.id) }>削除</button>
							  </div>
							</div>

						}else{
							return <div key={i} className="panel panel-default">
							  <div className="panel-heading">【完了】{todo.title}</div>
							  <div className="panel-body">
							    <p>内容：{todo.desc}</p>
							    <p>登録日：{todo.created_at}</p>
							    <br />
							    <button onClick={ () => this.props.updateState(todo.id, 0) }>未完了にする</button>　　
							    <button onClick={ () => this.props.deleteTodo(todo.id) }>削除</button>
							  </div>
							</div>							

						}

					})
				}
			</div>
		);
	}
}

class Form extends Component {
	constructor(props) {
		super(props);
		this.addTodo = this.addTodo.bind(this);
	}

	addTodo() {
		var msg = "";
		var bool = true;
		if(!this.refs.title.value || this.refs.title.value==""){
			msg += "・タイトルを入力してください。\n"
			bool = false;
		}
		if(!this.refs.desc.value || this.refs.desc.value==""){
			msg += "・内容を入力してください。\n"
			bool = false;
		}
		if(!bool){
			alert(msg);
			return;
		}


		var content = {
			title: this.refs.title.value,
			desc: this.refs.desc.value
		};
		this.props.addTodo(content);

		this.refs.title.value = "";
		this.refs.desc.value = "";
	}

	render() {
		return (
			<div>
				タイトル：<input className="form-control" type="text" ref="title" />
				内容：<input className="form-control" type="text" ref="desc" />
				<button className="btn btn-danger" onClick={this.addTodo} >登録</button>
			</div>
		);
	}
}


class TodoApp extends Component {
	constructor() {
		super();
		this.state = {
			todo: []
		};
	}

	componentDidMount() {
		this.realtimeCatch();
	}

	realtimeCatch() {
		
		todoRef.orderBy("created_at", "asc")
			.onSnapshot(snapShot => {
				this.state.todo = [];

		        snapShot.forEach(doc => {

		        	const timestamp = doc.data().created_at;
		        	const date = timestamp.toDate();

		          this.state.todo.push({
		            title : doc.data().title,
		            desc : doc.data().desc,
		            done : doc.data().done,
		            created_at : String(date),
		            id : doc.id
		          });
		        });

				this.setState({
					todo: this.state.todo
				});
			});
	}

	addTodo(content){

		todoRef.add({
			title: content.title,
			desc: content.desc,
			done: false,
			created_at: new Date()
		});

	}

	deleteTodo(id){

		todoRef.doc(id)
			.delete();
	}

	updateState(id, type){
		if(type==1){
			//完了にする
			todoRef.doc(id)
			.update({
				done: true
			});
		}else if(type==0){
			//未完了にする
			todoRef.doc(id)
			.update({
				done: false
			});
		}
	}

	render() {
		return (
			<div className="todoApp">
				<Header />
				<div className="row">
            		<div className="col-xs-2"></div>
      				<div className="col-xs-8">
						<h2>TODOリスト２</h2>
						<TodoList todo={this.state.todo} deleteTodo={this.deleteTodo} updateState={this.updateState} />
						<Form addTodo={this.addTodo}/>
						<br /><br /><br />
					</div>
					<div className="col-xs-2"></div>
				</div>
			</div>
		);
	}
}

export default TodoApp

