import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreators';

class TodoList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
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
							    <button onClick={ () => this.props.doneTodo(todo.id, 1) }>完了</button>　　
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
							    <button onClick={ () => this.props.doneTodo(todo.id, 0) }>未完了にする</button>　　
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

const mapStateToProps = state => {
  // return {
  //   todo: state.todo
  // }
  return state.todo;
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: (id) => dispatch(actions.deleteTodo(id)),
    doneTodo: (id, mode) => dispatch(actions.doneTodo(id, mode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)