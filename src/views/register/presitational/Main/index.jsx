import React from 'react'
import style from './index.module.styl';
import {Link} from 'react-router-dom';

export default ({verify,register,getMsgCode,msgCodeBtnText,registerBtnState,agreementState}) => (
        <div className={style.subContent}>
                <div className={style['input-box']}>
                        <div className={style.floor}>
                                <input type="text" placeholder='手机号' onInput={({target:{value}}) => verify('username',value)}/>
                        </div>
                        <div className={style.floor}>
                                <input type="text" placeholder='短信验证码' onInput={({target:{value}}) => verify('msgCode',value)}/>
                                <span className={style['get-msg-code']} onClick={()=>getMsgCode()}>{msgCodeBtnText}</span>
                        </div>
                        <div className={style.floor}>
                                <input type="password" placeholder='请输入密码' onInput={({target:{value}}) => verify('password',value)}/>
                        </div>
                        <div className={style.floor}>
                                <input type="password" placeholder='重复密码' onInput={({target:{value}}) => verify('subPassword',value)}/>
                        </div>
                </div>
                <div className={style.agreement}>
                        <div className={style.autoLogin}>
                                <span onClick={()=>verify('agreementState',!agreementState)}>
                                        {agreementState&&<img alt=""/>}
                                </span>
                                <span>我已阅读并同意遵守</span>
                                <Link to="#">法律声明</Link>
                                <span>和</span>
                                <Link to="#">隐私条款</Link>
                        </div>
                </div>
                <div className={`${style['register-btn']} ${registerBtnState?style.active:''}`} onClick={()=>register()}>
                        <span>注册</span>
                </div>
                <div className={style.loginBtn}>
                        <span>如果您已拥有 Smartisan ID，则可在此</span>
                        <Link to="/user/login">
                                登录
                        </Link>
                </div>
        </div>
)

