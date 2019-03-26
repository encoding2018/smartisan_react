import React from 'react'
import style from './index.module.styl';
import {Link} from 'react-router-dom';

export default ({user:{username},logout}) => (
        <div className={style.subContent}>
                <div className={style.floor}>
                        <div className={style['msg-bar']}>
                                <div></div>
                                <div>{username}</div>
                                <div></div>
                        </div>
                        <div className={style.bar}>
                                <Link to={'#'}>
                                        <div>手机</div>
                                        <div>{username}</div>
                                        <div></div>
                                </Link>
                        </div>
                        <div className={style.bar}>
                                <Link to={'#'}>
                                        <div>邮箱</div>
                                        <div>未关联</div>
                                        <div></div>
                                </Link>
                        </div>
                </div>
                <div className={style.floor}>
                        <div className={style.bar}>
                                <Link to={'/user/change'}>
                                        <div>修改密码</div>
                                        <div></div>
                                </Link>
                        </div>
                </div>
                <div className={style.btn} onClick={logout}>
                        退出登录
                </div>
        </div>
);