import React from 'react';
import ReactDOM from 'react-dom';
import './Dynamic_Table/index.css';
import App from './Dynamic_Table/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Dynamic_Table/Reducers/rootReducer'
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
