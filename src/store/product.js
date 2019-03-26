import http from '../utils/http';

const defaultState={
        list:{}
};

const actionTypes={
        INIT:'product/init'
};

export const productActions={
        INIT:(payload)=>(dispatch,getState)=>{
                return http('/product/all',{id:payload})
                        .then(data=>{
                                dispatch({type:actionTypes.INIT,payload:data});
                        })
        }
};

export default (state=defaultState,{type,payload}={})=>{
        switch(type){
                case actionTypes.INIT:
                        return Object.assign({},state,{list:payload});
                default: return state;
        }
}