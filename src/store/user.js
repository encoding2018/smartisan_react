import http from '../utils/http';
import api from '../utils/api';
const defaultState = {
        username : '',
        isLogin : false,
        isInit:true
};

const ActionTypes = {
        SETUSER : 'user/get',
        LOGOUT:'user/logout'
};

export const userActions = {
        SETUSER:(payload)=>(dispatch,getState)=>{
                dispatch({type:ActionTypes.SETUSER,payload:{username:payload}})
        },
        GETUSER:()=>(dispatch,getState)=>{
                if(!getState().user.isInit) return;
                http(api.user.ACCOUNT)
                        .then(result=> {
                                if(result.ok) dispatch({type:ActionTypes.SETUSER,payload:{username:result.username}})
                        })
        },
        LOGOUT:()=>(dispatch)=>{
                dispatch({type:ActionTypes.LOGOUT})
        }
};

export default (state=defaultState,{type,payload})=>{
        switch(type){
                case ActionTypes.SETUSER:
                        let {username} = payload;
                        username = username && `+86 ${username.replace(username.slice(3,7),'****')}`;
                        return Object.assign({},state,{username,isLogin:true,isInit:false});
                case ActionTypes.LOGOUT:
                        return Object.assign({},state,{username:'',isLogin:false});
                default:
                        return state
        }
}