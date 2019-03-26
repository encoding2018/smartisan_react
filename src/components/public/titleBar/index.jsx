import React from 'react';
import {Link} from 'react-router-dom'
import style from './index.module.styl';

export default (props)=>(
                <div className={style.title}>
                        <Link to={props.cid ? `/index/floor/${props.cid}` : '#/' }>
                                <p className={style.titleText}>
                                        {props.title}
                                </p>
                                <p className={style.productText}></p>
                        </Link>
                </div>
)

