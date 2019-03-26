import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
//createStore 以总reducers为参数创建一个redux仓库对象
//combineReducers 将多个子reducers绑定成一个总reducers
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import home from './home';
import template from './template';
import category from './category';
import product from './product';
import user from './user';
import cart from './cart';
import site from './site'
let reducer = combineReducers({
        home,
        template,
        category,
        product,
        user,
        cart,
        site
});

const store = createStore(
        reducer,
        compose(
                applyMiddleware(thunk,promiseMiddleware), //让dispatch有接收函数的能力
        )
);

export default store;