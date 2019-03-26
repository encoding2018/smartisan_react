import http from '../utils/http';

const defaultState = {
        banner:[],
        bannerMenu:[],
        poster:{},
        product:[],
        isInit:false,
        curId:2,
};

const actionTypes = {
        INIT:'home/init',
        UPDATE:'home/update'
};

export const homeActions = {
        INIT:()=>(dispatch,getState)=>{
                if(getState().home.isInit) return;
                return http('/all',)
                        .then(data=>dispatch({type:actionTypes.INIT,payload:data}))
        },
        UPDATE:(payload)=>(dispatch,getState)=>{
                let curId =payload || getState().home.curId;
                return http('/update',{cid:curId})
                        .then(data=>{
                                dispatch({type:actionTypes.UPDATE,payload:{data:data[0],state:!!payload}})
                        })
        },
};

export default (state=defaultState,{type,payload}={})=>{ //类似于vue 仓库中的mutations节点
        switch(type){
                case actionTypes.INIT:
                        return Object.assign({},state,{...payload,isInit:true});
                case actionTypes.UPDATE:
                        let {curId} = state;
                        return Object.assign({},state,{product:[...state.product,payload.data],curId:payload.state ? curId : curId+1});
                default: return state;
        }
}