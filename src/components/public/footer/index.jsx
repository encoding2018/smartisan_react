import React from 'react'
import style from './index.module.styl';
import {NavLink} from 'react-router-dom'
class Footer extends React.Component{
        constructor(){
                super();
                this.state={
                        MenuData: [
                                {name: '首页', url: '/'},
                                {name: '分类', url: '/category'},
                                {name: '购物车', url: '/cart'},
                                {name: '个人中心', url: '/center'}
                        ]
                }
        }
        render(){
                return (
                        <>
                                <ul className={style.menu}>
                                        {this.state.MenuData.map((item,i)=>(
                                                <li key={i} className={style.btn}>
                                                        <NavLink to={item.url} exact activeClassName={ style.active }>
                                                                <img className={style[`img${i+1}`]} alt=""/>
                                                                <img className={style[`activeImg${i+1}`]} alt=""/>
                                                                <span>{item.name}</span>
                                                        </NavLink>
                                                </li>
                                        ))}
                                </ul>
                        </>
                )
        }
}

export default Footer;