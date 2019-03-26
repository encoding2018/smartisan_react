import React from 'react'
import style from './index.module.styl';

export default ({username,getMsgCodeBtnText,verifyBtnState,verify,verifyBtn,getMsgCode}) => (
        <div className={style.subContent}>
                <div className={style["input-box"]}>
                        <div className={style.floor}>
                                <input type="text"  readOnly value={`+86 ${username.replace(username.slice(3,7),'****')}`}/>
                        </div>
                        <div className={style.floor}>
                                <input type="text" onInput={(e)=>verify('verify','msgCode',e.target.value)}/>
                                <span onClick={()=>getMsgCode()} className={style["get-msg-code"]}>{getMsgCodeBtnText}</span>
                        </div>
                </div>
                <div onClick={()=>verifyBtn()} className={`${style.btn} ${verifyBtnState?style.active:''}`}>
                        下一步
                </div>
        </div>
)