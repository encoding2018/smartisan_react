import React from 'react'
import style from './index.module.styl';

export default ({username,verify,changeBtnState,changeBtn}) => (
        <div className={style.subContent}>
                <div className={style["input-box"]}>
                        <div className={style.floor}>
                                <input type="text" readOnly value={`+86 ${username.replace(username.slice(3,7),'****')}`}/>
                        </div>
                        <div className={style.floor}>
                                <input type="password" placeholder='新密码' onInput={(e)=>verify('change','password',e.target.value)}/>
                        </div>
                        <div className={style.floor}>
                                <input type="password" placeholder='重复密码' onInput={(e)=>verify('change','subPassword',e.target.value)}/>
                        </div>
                </div>
                <div onClick={()=>changeBtn()} className={`${style.btn} ${changeBtnState?style.active:''}`}>
                        <span>修改密码</span>
                </div>
        </div>
)