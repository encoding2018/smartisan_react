import http from '../utils/http';

const defaultState = { //类似于vue中的state节点
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

export const homeActions = { //类似于vue 仓库中的 actions节点
        INIT:()=>(dispatch,getState)=>{
                if(getState().home.isInit) return;
                http('/all',)
                        .then(data=>dispatch({type:actionTypes.INIT,payload:data}))
        },
        UPDATE:(payload)=>(dispatch,getState)=>{
                let {curId} = getState().home;
                return http('/update',{cid:getState().home.curId})
                        .then(data=>{
                                let previousDate = getState().home.product;
                                previousDate.push(data[0]);
                                dispatch({type:actionTypes.INIT,payload:{product:previousDate,curId:curId+1}})
                        });
        }
};

export default (state=defaultState,action={})=>{ //类似于vue 仓库中的mutations节点
        let {type,payload} =action;
        switch(type){
                case actionTypes.INIT:
                        return Object.assign({},state,{...payload,isInit:true});
                default: return state;
        }
}