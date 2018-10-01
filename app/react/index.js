import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import Todo from './Todo';
import TodoApp from './TodoApp';
import Routing from './Routing';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Todo />, document.getElementById('todo'));
//ReactDOM.render(<TodoApp />, document.getElementById('todo2'));
ReactDOM.render(<Routing />, document.getElementById('root'));

registerServiceWorker();
