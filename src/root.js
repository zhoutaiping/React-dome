import React from 'react';
import ReactDOM,{ render } from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './stores';
import Router from './route/index';


render(
	<Provider store={configureStore}>
		<Router/>
	</Provider>,
	document.getElementById('app')
)
