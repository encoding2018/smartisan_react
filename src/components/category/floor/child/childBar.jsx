import React from 'react'
import style from './childBar.module.styl'
export default (props)=>(
                <div className={style.bar}>
                        <div className={style.imgBox}><img src={props.data.avatar} alt=""/></div>
                        <div className={style.nameBox}>{props.data.name}</div>
                        <div className={style.btnBox}></div>
                </div>
        )