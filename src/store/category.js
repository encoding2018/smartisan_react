import http from '../utils/http';

const defaultState={
        list:[],
        isInit:false,
        curId:4,
};

const actionTypes={
        INIT:'category/init',
        UPDATE:'category/update',
};

//actionCreators (action 创造器)
export const categoryActions={
        INIT:()=>(dispatch,getState)=>{
                if(getState().category.isInit) return;
                return http('category/all',{cid:3})
                        .then(data=>{
                                dispatch({type:actionTypes.INIT,payload:{list:data,isInit:true}})
                        })
        },
        UPDATE:(payload)=>(dispatch,getState)=>{
                let curId = payload || getState().category.curId;
                return http('category/update',{cid:curId})
                        .then(data=>{
                                dispatch({type:actionTypes.UPDATE,payload:{data:data[0],state:!!payload}})
                        })
        }
};

export default (state=defaultState,{type,payload}={})=>{
        switch(type){
                case actionTypes.INIT:
                        return Object.assign({},state,payload);
                case actionTypes.UPDATE:
                        let {curId} = state;
                        return Object.assign({},state,{list:[...state.list,payload.data],curId:payload.state ? curId : curId+1});
                default: return state;
        }
}