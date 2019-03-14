const defaultState = {
        TextContent:'',
        Back:false,
        Text:false,
        Logo:false,
        Menu:false,
        Search:false
};

const actionTypes = {
        REFRESH:'template/refresh',
        NAV:'template/nav',
        NavTExt:'template/text'
};

export const templateActions = {
        NAV:(payload)=>(dispatch,getState)=>{
                dispatch({type:actionTypes.REFRESH,payload:false}); //重置
                payload.Btn.forEach(v=>{dispatch({type:actionTypes.NAV,payload:{name:v}})});
                if(payload.textContent) dispatch({type:actionTypes.NavTExt,payload:payload.textContent});
        }
};

export default (state=defaultState,action={})=>{
        let {type,payload} =action;
        switch(type){
                case actionTypes.NAV:
                        return Object.assign({},state,{[payload.name]:true});
                case actionTypes.REFRESH:
                        return Object.assign({},state,{TextContent:'', Back:false, Text:false, Logo:false, Menu:false, Search:false});
                case actionTypes.NavTExt:
                        return Object.assign({},state,{TextContent:payload});
                default: return state;
        }
}