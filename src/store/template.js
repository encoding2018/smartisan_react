const defaultState = {
        TextContent:'',
        Back:false,
        Text:false,
        Logo:false,
        Menu:false,
        Search:false,
        footerShow:true
};

const actionTypes = {
        REFRESH:'template/refresh',
        NAV:'template/nav',
        NAVTEXT:'template/text',
        FOOTER:'template/footer',
        INFO:'template/info'
};
let timer;
export const templateActions = {
        NAV:(payload)=>(dispatch,getState)=>{
                dispatch({type:actionTypes.REFRESH,payload:false}); //重置
                payload.Btn.forEach(v=>{dispatch({type:actionTypes.NAV,payload:{name:v}})});
                if(payload.textContent) dispatch({type:actionTypes.NAVTEXT,payload:payload.textContent});
        },
        FOOTER:(payload)=>(dispatch,getState)=>{
                dispatch({type:actionTypes.FOOTER,payload})
        },
        INFO:(payload)=>(dispatch,getState)=>{
                let {infoMsg,time} = payload;
                dispatch({type:actionTypes.INFO,payload:{infoMsg,infoShow:true}});
                clearInterval(timer);
                timer = setTimeout(()=>{
                        dispatch({type:actionTypes.INFO,payload:{infoShow:false}});
                },time)
        }
};

export default (state=defaultState,{type,payload}={})=>{
        switch(type){
                case actionTypes.NAV:
                        return Object.assign({},state,{[payload.name]:true});
                case actionTypes.REFRESH:
                        return Object.assign({},state,{TextContent:'', Back:false, Text:false, Logo:false, Menu:false, Search:false});
                case actionTypes.NAVTEXT:
                        return Object.assign({},state,{TextContent:payload});
                case actionTypes.FOOTER:
                        return Object.assign({},state,{footerShow: payload});
                case actionTypes.INFO:
                        let {infoMsg,infoShow} = payload;
                        return Object.assign({},state,{infoMsg,infoShow});
                default: return state;
        }
}