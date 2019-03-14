import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import home from './home';
import template from './template';

let reducer = combineReducers({
        home,
        template
});

const store = createStore(
        reducer,
        compose(
                applyMiddleware(thunk), //让dispatch有接收函数的能力
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
);

export default store;