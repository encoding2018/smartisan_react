import React from 'react'
import style from './index.module.styl';
import {NavLink,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
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
                                {this.props.template.footerShow&&
                                        <ul className={style.menu}>
                                                {this.state.MenuData.map((item,i)=> (
                                                              <li key={i} className={style.btn}>
                                                                      <NavLink to={item.url} activeClassName={ style.active } exact>
                                                                              <img className={style[`img${i+1}`]} alt=""/>
                                                                              <img className={style[`activeImg${i+1}`]} alt=""/>
                                                                              <span>{item.name}</span>
                                                                      </NavLink>
                                                              </li>
                                                      ))}
                                        </ul>
                                }
                        </>
                )
        }
}

function mapStateToProps({template}){
        return{
                template
        }
}
export default connect(mapStateToProps,null)(withRouter(Footer));