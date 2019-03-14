import React from 'react'
import style from './index.module.styl';
import {Link} from 'react-router-dom';
export default (props)=> (
                        <>
                                {props.data&&
                                        <div className={props.template===1?style["poster-top"]:style["poster-bottom"]}>
                                                <div className={style.left}>
                                                        {props.data.filter(item=>item.location===1).map((item,i)=>(
                                                                <div key={i}>
                                                                        <Link to={`/product/${item.id}`}>
                                                                                <img src={item.avatar} alt=""/>
                                                                        </Link>
                                                                </div>
                                                        ))}
                                                </div>
                                                <div className={style.right}>
                                                        {props.data.filter(item=>item.location===2).map((item,i)=>(
                                                                <div key={i}>
                                                                        <Link to={`/product/${item.id}`}>
                                                                                <img src={item.avatar} alt=""/>
                                                                        </Link>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                }
                        </>
)

