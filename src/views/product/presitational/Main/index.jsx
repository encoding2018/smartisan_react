import React, {Component} from 'react';
import style from './index.module.styl';
import {Link} from 'react-router-dom';
import TitleBar from '../../../../components/public/titleBar';
import IScroll from 'iscroll';
import HideLayer from '../hideLayer/index';
class Main extends Component{
        constructor(props){
                super(props);
                this.state = {
                        titleBar:['商品', '详情', '参数', '推荐'],
                        typeArr:[
                                {name:'color',cnName:'颜色'},
                                {name:'type',cnName:'容量'},
                                {name:'size',cnName:'尺寸'},
                                {name:'style',cnName:'款式'},
                                {name:'edition',cnName:'版本'},
                        ],
                        hideLayerState:false,
                };
                this.changeHideLayerState =  this.changeHideLayerState.bind(this)
        }

        render(){
                return (
                        <>
                                { JSON.stringify(this.props.curProduct)!=="{}" &&
                                        <div className={style.subContent}>
                                                <div className={style["title-box"]}>
                                                        {this.state.titleBar.map((item,i)=>(
                                                                <div key={i} className={i===0?style.active:''}>{item}</div>
                                                        ))}
                                                </div>
                                                <div className={style.IScrollContent} ref={(dom)=>this.IScrollContent = dom}>
                                                        <div className={style.productContent}>
                                                                <div className={style["img-box"]} >
                                                                        <img src={this.props.curProduct.avatar} alt=""/>
                                                                </div>
                                                                <div className={style["message-box"]}>
                                                                        <TitleBar title="商品信息"/>
                                                                        <div className={style.message}>
                                                                                <div className={style.name}>
                                                                                        {this.props.list.name}
                                                                                </div>
                                                                                <div className={style.title}>
                                                                                        {this.props.list.subtitle||this.props.list.title}
                                                                                </div>
                                                                                <div className={style.price}>
                                                                                        {`￥${this.props.curProduct.price}.00`}
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className={style["type-select"]} onClick={()=>this.changeHideLayerState(true)}>
                                                                        <div className={style.title}>已选版本</div>
                                                                        <div className={style["type-box"]}>
                                                                                <div>
                                                                                        {this.state.typeArr.map((item,i)=>{
                                                                                                if(!this.props.curProduct[item.name]) return;
                                                                                               return (
                                                                                                        <div key={i}>
                                                                                                                <span>{`${item.cnName}:`}</span>
                                                                                                                <span>{this.props.curProduct[item.name]}</span>
                                                                                                        </div>
                                                                                                )
                                                                                        })}
                                                                                        <div>
                                                                                                <span>数量:</span>
                                                                                                <span>{this.props.selectQuantity}</span>
                                                                                        </div>
                                                                                </div>
                                                                                <div><img src="./img/next_black.png" alt=""/></div>
                                                                        </div>
                                                                </div>
                                                                <div className={style.details}>
                                                                        <TitleBar title='商品详情'/>
                                                                </div>
                                                        </div>
                                                </div>
                                                <HideLayer
                                                        typeArr={this.props.typeArr}
                                                        curProduct={this.props.curProduct}
                                                        list={this.props.list}
                                                        selectQuantity = {this.props.selectQuantity}
                                                        hideLayerState = {this.state.hideLayerState}
                                                        changeHideLayerState = {this.changeHideLayerState}
                                                        changeCurProduct = {this.props.changeCurProduct}
                                                        changeSelectQuantity = {this.props.changeSelectQuantity}
                                                />
                                                <div className={style.BottomMenu}>
                                                        <div className={style.icon}>
                                                                <Link to='/cart'></Link>
                                                        </div>
                                                        <div className={`${style.addCart} ${style.btn}`} onClick={()=>{this.props.addCart();this.setState({hideLayerState:false})}}>
                                                                <span>加入购物车</span>
                                                        </div>
                                                        <div className={`${style.buy} ${style.btn}`}>
                                                                <span>现在购买</span>
                                                        </div>
                                                </div>
                                        </div>
                                }
                        </>
                )
        }
        shouldComponentUpdate(nextProps, nextState, nextContext){
                return (nextProps.curProduct.id !== this.props.curProduct.id) ||
                        (nextState.hideLayerState !== this.state.hideLayerState) ||
                        (nextProps.selectQuantity !== this.props.selectQuantity)
        }

        componentDidUpdate(prevProps, prevState, snapshot){
                this.initIScroll();
        }
        changeHideLayerState(state){
                this.IScroll.scrollTo(0, 0, 500);
                this.setState({hideLayerState:state})
        }
        initIScroll(){
                if(!this.IScrollContent&&!this.IScroll) return;
                this.IScroll = new IScroll(this.IScrollContent,{
                        click:true
                })
        }
}

export default Main;