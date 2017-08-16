import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,	IndexRoute,	browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import * as firebase from 'firebase';

import rootReducer from './reducers';

import App from './components/App';
import Upload from './components/Upload';
import Table from './components/Table';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCaZfiiXDvw9LPSZYTjiY-WFVayLMZHJzw",
    authDomain: "project-xl-b3cdc.firebaseapp.com",
    databaseURL: "https://project-xl-b3cdc.firebaseio.com",
    projectId: "project-xl-b3cdc",
    storageBucket: "project-xl-b3cdc.appspot.com",
    messagingSenderId: "558667355883"
};
firebase.initializeApp(config);

const logger = createLogger();
const store = createStore(
				rootReducer,
				applyMiddleware(thunk, promise, logger)
			);


ReactDOM.render((<Provider store={store}>
					<Router history = { browserHistory }>
						<Route path = "/" component = { App }>
							<IndexRoute component = { Upload } />
							<Route path = "/table" component = { Table } />
						</Route>
					</Router>
				</Provider>), document.getElementById('app'));