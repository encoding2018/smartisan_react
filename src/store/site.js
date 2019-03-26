import http from '../utils/http';
import api from '../utils/api';
const defaultState = {
        list:[],
        isInit:false
};

const ActionTypes = {
        INIT:'site/init'
};

export const siteActions = {
        INIT:()=>(dispatch,getState)=>{
                if(getState().site.isInit) return;
                http(api.site.GET)
                        .then(result=>dispatch({type:ActionTypes.INIT,payload: result.data}))
        }
};

export default (state=defaultState,{type,payload}={})=>{
        switch(type){
                case ActionTypes.INIT:
                        return Object.assign({},state,{list:payload,isInit:true});
                default:
                        return state;
        }
}