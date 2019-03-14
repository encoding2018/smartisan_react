import http from '../utils/http';

const defaultState={

};

const actionTypes={
        INIT:'category/init'
};

export const categoryActions={
        INIT:(payload)=>(dispatch,getState)=>{
                
        }
};

export default (state=defaultState,action={})=>{
        let {type,payload} = action;
        switch(type){
                case actionTypes.INIT:

                        break;
                default: return state;
        }
}