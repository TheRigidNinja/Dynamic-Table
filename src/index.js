import React from 'react';
import ReactDOM from 'react-dom';
import './Dynamic_Table/index.css';
import App from './Dynamic_Table/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Dynamic_Table/Reducers/rootReducer'

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
