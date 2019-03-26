import React from 'react';
import style from './index.module.styl';

export default ({svg,getPictureCode,initialBtn,verify,initialBtnState}) => (
        <div className={style.subContent}>
                <div className={style["input-box"]}>
                        <div className={style.floor}>
                                <input name='initialUsername' type="text" placeholder={'手机号'} onInput={(e)=>verify('initial','username',e.target.value)}/>
                        </div>
                        <div className={style.floor}>
                                <input name='initialCode' type="text" placeholder={'验证码'} onInput={(e)=>verify('initial','initialCode',e.target.value)}/>
                                <span onClick={()=>getPictureCode()} dangerouslySetInnerHTML={{__html:svg}} className={style["picture-code"]}></span>
                        </div>
                </div>
                <div onClick={()=>initialBtn()} className={`${style.btn} ${initialBtnState?style.active:''}`}>下一步</div>
        </div>
)