import React from 'react'
import style from './index.module.styl';
import {Link} from 'react-router-dom';
import IScroll from 'iscroll';
class Main extends React.Component{
        constructor(props){
                super(props);
                this.state = {}
        }

        render(){
                return (
                        <div className={style.IScrollContent} ref={dom=>this.IScrollContent = dom}>
                                <div className={style.subContent}>
                                        <div className={style.userState}>
                                                <div className={style.top}>
                                                        <Link to={this.props.isLogin? '/user/details' : '/user/login'}>
                                                                <div></div>
                                                                <div>{this.props.username || '登录/注册'}</div>
                                                                <div></div>
                                                        </Link>
                                                </div>
                                                <div className={style.bottom}>
                                                        {this.props.state.userState.map((item, i) => (
                                                                <div key={i}>
                                                                        <Link to='/order/all'>
                                                                                <img src={item.img} alt=""/>
                                                                                <span>{item.title}</span>
                                                                        </Link>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                        {this.props.state.BtnArr.map((item,i) => (
                                                <ul className={style.barBox} key={i}>
                                                        {
                                                                item.map((item, i) => (
                                                                        <li className={style.bar} key={i}>
                                                                                <Link to={item.url}>
                                                                                        <div>{item.title}</div>
                                                                                        <div>
                                                                                                <img src="./img/next_black.png" alt=""/>
                                                                                        </div>
                                                                                </Link>
                                                                        </li>
                                                                ))
                                                        }
                                                </ul>)
                                        )}
                                </div>
                        </div>
                )
        }

        componentDidMount(){
                new IScroll(this.IScrollContent,{click:true})
        }
}

export default Main;