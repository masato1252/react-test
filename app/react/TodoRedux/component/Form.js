import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreators';

class Form extends Component {
	constructor(props) {
		super(props);
		this.addTodo_ = this.addTodo_.bind(this);
	}

	addTodo_() {
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
		console.log(this.props);
		return (
			<div>
				タイトル：<input className="form-control" type="text" ref="title" />
				内容：<input className="form-control" type="text" ref="desc" />
				<button className="btn btn-danger" onClick={this.addTodo_} >登録</button>
			</div>
		);
	}
}


const mapStateToProps = state => {
  return {
    todo: state.todo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (todo) => dispatch(actions.addTodo(todo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)