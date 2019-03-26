import http from '../utils/http';
import api from '../utils/api';
const defaultState = {
        data:[],
        isInit:false
};

const ActionTypes = {
        INIT: 'cart/init',
        CHANGE:'cart/change',
        REDUCE:'cart/reduce',
        ADD:'cart/add',
        REMOVE:'cart/remove',
        OPENINIT:'cart/openInit'
};

export const cartActions = {
        INIT:()=>(dispatch,getState)=>{
                if(getState().cart.isInit) return;
                return http(api.cart.ALL)
                        .then(result=>{if(result.ok) dispatch({type:ActionTypes.INIT,payload:result.data})})
        },
        SELECT:(payload)=>(dispatch,getState)=>{
                let selectId = payload , temp , selectNum = 0,{cart:{data}} = getState(),allPrice = 0;
                temp = data.map(item=>{
                        if(selectId === item.id&&typeof payload!=='boolean'){item.select = !item.select}
                        if(typeof payload === 'boolean') item.select = payload;
                        if(item.select) {++selectNum; allPrice+=item.price*item.quantity}
                        return item;
                });
                dispatch({type:ActionTypes.CHANGE,payload:temp});
                return {selectNum,allNum:data.length,allPrice};
        },
        REDUCE:(payload)=>(dispatch,getState)=>{
                http(api.cart.REDUCE,{pid:payload})
                        .then(result=>{
                                if(!result.ok) return;
                                let temp = getState().cart.data.map(item=>{if(item.id===payload) item.quantity -=1; return item});
                                dispatch({type:ActionTypes.CHANGE,payload:temp});
                        })
        },
        ADD:(payload)=>(dispatch,getState)=>{
                http(api.cart.ADD,{pid:payload,num:1})
                        .then(result=>{
                                if(!result.ok) return;
                                let temp = getState().cart.data.map(item=>{if(item.id===payload) item.quantity +=1; return item});
                                dispatch({type:ActionTypes.CHANGE,payload:temp});
                        })
        },
        REMOVE:(payload)=>(dispatch,getState)=>{
                if(!payload) return;
                let {cart:{data}} = getState(),temp = [],dataTemp=[],reg;
                data.forEach(item=>{if(item.select) temp.push(item.select&&item.cartid)});
                reg = new RegExp(temp.toString().replace(/,/g,'|'));
                http(api.cart.REMOVE,{pidArr:temp})
                        .then(result=>{
                                if(!result.ok) return;
                                data.forEach(item=>{if(!reg.test(item.cartid)) dataTemp.push(item);});
                                dispatch({type:ActionTypes.CHANGE,payload:dataTemp})
                        })
        },
        OPENINIT: () =>(dispatch)=>{
                dispatch({type:ActionTypes.OPENINIT})
        }
};

export default (state=defaultState,{type,payload}={})=>{
        switch(type){
                case ActionTypes.INIT:
                        return Object.assign({},state,{data:payload.map(item=>{item.select = false;item.remove=false;return item}),isInit:true});
                case ActionTypes.CHANGE:
                        return Object.assign({},state,{data:payload});
                case ActionTypes.OPENINIT:
                        return Object.assign({},state,{isInit:false});
                default :return state;
        }
}