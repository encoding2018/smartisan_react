import React from 'react'
import style from "./index.module.styl";
import {Link} from "react-router-dom";

export default ({verify,login,loginBtnState})=>(
        <div className={style["sub-content"]}>
                <div className={style['input-box']}>
                        <input
                                onInput={(e)=>verify('username',e.target.value)}
                                type="text"
                                placeholder='手机号/邮箱'/>
                        <input
                                onInput={(e)=>verify('password',e.target.value)}
                                type="password"
                                placeholder='密码'/>
                </div>
                <div className={style['menu-box']}>
                        <div className={style["auto-login"]}>
                                                <span>
                                                        <img  alt=""/>
                                                </span>
                                <span>自动登录</span>
                        </div>
                        <div className={style["sign-up"]}>
                                <Link to='/user/register'>
                                        <span>注册</span>
                                </Link>
                                <Link to='/user/change'>
                                        <span>修改密码</span>
                                </Link>
                        </div>
                </div>
                <div onClick={()=>login()}
                     className={`${style.button} ${loginBtnState? style.active : ''}`} >
                        <span>登录</span>
                </div>
        </div>
);