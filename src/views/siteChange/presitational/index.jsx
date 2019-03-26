import React from 'react'
import style from './index.module.styl';

export default ({provinceArr,changeProvince,cityArr,changeCity,areaArr}) => (
        <div className={style.subContent}>
                <div className={style.inputBox}>
                        <input type="text" placeholder="请输入姓名"/>
                </div>
                <div className={style.inputBox}>
                        <input type="text" placeholder="手机号"/>
                        <input type="text" placeholder="区号(可选)"/>
                        <input type="text" placeholder="固定电话(可选)"/>
                </div>
                <div className={style.siteBox}>
                        <div>
                                <select onChange={(e)=>changeProvince(e.target.value)}>
                                        <option value=''>请选择省份</option>
                                        {provinceArr.map((item,i)=>(
                                                <option value={item} key={i}>{item}</option>
                                        ))}
                                </select>
                        </div>
                        <div>
                                <select onChange={(e)=>changeCity(e.target.value)} >
                                        <option>请选择城市</option>
                                        {cityArr.map((item,i)=>(
                                                <option value={item} key={i}>{item}</option>
                                        ))}
                                </select>
                        </div>
                        <div>
                                <select>
                                        <option>请选择区县</option>
                                        {areaArr.map((item,i)=>(
                                                <option value={item} key={i}>{item}</option>
                                        ))}
                                </select>
                        </div>
                </div>
                <div className={style.inputBox}>
                        <input type="text" placeholder="详细地址，如街道名称，楼层，门牌号码等"/>
                </div>
                <div className={style.saveBtn}>
                        保存
                </div>
        </div>
)