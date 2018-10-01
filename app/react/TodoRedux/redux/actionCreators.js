import * as actionType from './actionTypes'

// Action Creator
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