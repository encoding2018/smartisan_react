import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import history from './router'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
        <Provider store={store}>
                <Router history={history}>
                        <App/>
                </Router>
        </Provider>
        , document.getElementById('root'));

serviceWorker.unregister();