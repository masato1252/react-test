import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import Todo from './Todo';
//import TodoApp from './TodoApp';
import Routing from './Routing';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import createStore from './TodoRedux/redux/createStore';
import TodoRedux from './TodoRedux/TodoRedux';

const store = createStore();
console.log(store.getState())

//ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Todo />, document.getElementById('todo'));
//ReactDOM.render(<TodoApp />, document.getElementById('todo2'));
//ReactDOM.render(<Routing />, document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
