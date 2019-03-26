import redux from '../store';
import {templateActions} from '../store/template';
export const info = (infoMsg)=>{
        redux.dispatch(templateActions.INFO({infoMsg,time:3000}))
};