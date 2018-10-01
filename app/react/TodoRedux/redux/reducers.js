import * as actionType from './actionTypes'

import { firebaseDb } from '../../firebase.js';

const todoRef = firebaseDb.collection('todo2');


const initialState = {
  todo: [],
  id: 0,
  mode: 0
}


export const todoReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);
  let id = 0;
  let todo = null;
  let mode = 0;
  switch (action.type) {
    case actionType.UPDATE:
      // 新しく追加するTODO
      newState = Object.assign({}, state);
      newState.todo = [];

      receiveData(newState.todo, action.payload.snap);
      
      return newState;

    case actionType.ADD:
      // 新しく追加するTODO
      todo = action.payload.todo;
      addData(todo);
      // stateを複製して追加
      newState = Object.assign({}, state);
      newState.todo.push(todo);

      return newState;

    case actionType.DELETE:
      // 新しく追加するTODO
      id = action.payload.id;
      deleteData(id);
      // stateを複製して追加
      newState = Object.assign({}, state);
      newState.id = id;

      return newState;

    case actionType.DONE:
      // 新しく追加するTODO
      id = action.payload.id;
      mode = action.payload.mode;
      doneChange(id, mode);
      // stateを複製して追加
      newState = Object.assign({}, state);
      newState.id = id;

      return newState;

    default:
      return state;
  }
};

const receiveData = (todos, snap) => {
      
  snap.forEach(doc => {

    const timestamp = doc.data().created_at;
    const date = timestamp.toDate();

    todos.push({
      title : doc.data().title,
      desc : doc.data().desc,
      done : doc.data().done,
      created_at : String(date),
      id : doc.id
    });

  });

}

const addData = (todo) => {

    todoRef.add({
      title: todo.title,
      desc: todo.desc,
      done: false,
      created_at: new Date()
    });

  }

const deleteData = (id) => {

    todoRef.doc(id)
      .delete();
}


const doneChange = (id, mode) => {
  if(mode==1){
    //完了にする
    todoRef.doc(id)
    .update({
      done: true
    });
  }else if(mode==0){
    //未完了にする
    todoRef.doc(id)
    .update({
      done: false
    });
  }
}