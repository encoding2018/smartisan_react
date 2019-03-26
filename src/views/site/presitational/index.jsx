import React from 'react'
import style from './index.module.styl';
import {Link} from 'react-router-dom';
export default ({site:{list}}) => (
        <>
                {list.length&&
                        <div className={style.subContent}>
                                <ul>
                                        {list.map((item,i)=>(
                                                <li key={i} className={style.siteBar}>
                                                        <div className={style.left}>
                                                                <div className={style.top}>
                                                                        <span>{item.name}</span>
                                                                        <span>{item.phone}</span>
                                                                        <span></span>
                                                                </div>
                                                                <div className={style.bottom}>
                                                                        <span>{item.province}</span>
                                                                        <span>{item.city}</span>
                                                                        <span>{item.dist}</span>
                                                                        <span>{item.detailedSite}</span>
                                                                </div>
                                                        </div>
                                                        <div className={style.right}></div>
                                                </li>
                                        ))}
                                </ul>
                                <Link className={style['btn-box']} to='/site/change'>
                                        <div className={style.btn}>添加地址</div>
                                </Link>
                        </div>
                }
        </>

)