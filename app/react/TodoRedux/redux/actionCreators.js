import * as actionType from './actionTypes'

//-------------------
//  Todo
//-------------------
export function addTodo(todo) {
  // Action
  return {
    type: actionType.ADD,
    payload: { todo: todo }
  };
}

export function deleteTodo(id) {
  // Action
  return {
    type: actionType.DELETE,
    payload: { id: id }
  };
}

export function doneTodo(id, mode) {
  // Action
  return {
    type: actionType.DONE,
    payload: { id: id,
               mode: mode
             }
  };
}

export function updateTodo(snap) {
  // Action
  return {
    type: actionType.UPDATE,
    payload: { snap: snap }
  };
}

//-------------------
//  Auth
//-------------------

export function loginOk(user) {
  return {
    type: actionType.LOGIN_OK,
    payload: { user: user }
  }
}

export function logOut() {
  return{
    type: actionType.LOGOUT
  }
}