import React from 'react';
import style from './index.module.styl';
import {Link} from "react-router-dom";
import imagesLoaded from 'imagesloaded';
import IScroll from 'iscroll';
class Main extends React.Component{
        constructor(props){
                super(props);
        }
        render(){
                return (
                        <div className={style.subContent}>
                                {!!this.props.cart.data.length &&
                                <>
                                        {!this.props.isEdit &&
                                                <div className={style.floor1}>
                                                        <div className={style["img-box"]}></div>
                                                        <div className={style["text-box"]}>点击领取优惠券</div>
                                                </div>
                                        }
                                        <div className={style["product-box"]} ref={dom=>this.IScrollContent = dom}>
                                                <ul>
                                                        {!this.props.isEdit &&
                                                        <li className={style.placeholderTop}></li>}
                                                        {this.props.cart.data.map((item, i) => (
                                                                        <li className={style["product-bar"]} key={i}>
                                                                                <div className={style["check-box"]}>
                                                                                        <span onClick={() => this.props.selectProduct(item.id)}>{item.select &&
                                                                                        <span></span>}</span>
                                                                                </div>
                                                                                <div className={style["product-avatar"]}>
                                                                                        <img src={item.avatar} alt=""/>
                                                                                </div>
                                                                                <div className={style["product-type"]}>
                                                                                        <div className={style["show-name"]}>
                                                                                                <div className={style.name}>{item.name}</div>
                                                                                                {!item.size &&
                                                                                                <div className={style.type}>
                                                                                                        <span>{item.color || item.edition}</span>
                                                                                                        {item.type &&
                                                                                                        <span>•</span>}
                                                                                                        <span>{item.type}</span>
                                                                                                </div>
                                                                                                }
                                                                                                {item.size &&
                                                                                                <div className={style.type}>
                                                                                                        <span>{item.color}</span>
                                                                                                        <span>•</span>
                                                                                                        <span>{item.size}</span>
                                                                                                        <span>•</span>
                                                                                                        <span>{item.style}</span>
                                                                                                </div>
                                                                                                }
                                                                                        </div>
                                                                                        <div className={style["show-type"]}>
                                                                                                {this.props.isEdit &&
                                                                                                <div className={style["num-box"]}>
                                                                                                        <div className={style.reduce}
                                                                                                             onClick={() => item.quantity > 1 && this.props.reduce(item.id)}></div>
                                                                                                        <div className={style.num}>{item.quantity}</div>
                                                                                                        <div className={style.add}
                                                                                                             onClick={() => item.quantity < 3 && this.props.add(item.id)}></div>
                                                                                                </div>
                                                                                                }
                                                                                                <div className={style.price}>
                                                                                                        <span>￥</span>
                                                                                                        <span>{`${item.price}.00`}</span>
                                                                                                </div>
                                                                                                {!this.props.isEdit &&
                                                                                                <div className={style.num}>
                                                                                                        <span>x</span>
                                                                                                        <span>{item.quantity}</span>
                                                                                                </div>
                                                                                                }
                                                                                        </div>
                                                                                </div>
                                                                        </li>
                                                                )
                                                        )}
                                                        <li className={style.placeholderBottom}></li>
                                                </ul>
                                        </div>
                                        <div className={style.menu}>
                                                <div className={style["check-box"]}>
                                                        <div className={style.check}
                                                             onClick={() => this.props.selectAll()}>
                                                                {this.props.isSelectAll && <span></span>}
                                                        </div>
                                                        <span><span>已选</span><span>{this.props.selectNum}</span><span>件</span></span>
                                                </div>
                                                {!this.props.isEdit &&
                                                <div className={style.price}>
                                                        <div className={style.total}>
                                                                <span>合计:</span>
                                                                <span>
                                                                                <span>￥</span>
                                                                                <span>{`${this.props.allPrice}.00`}</span>
                                                                        </span>
                                                        </div>
                                                        <div>
                                                                {150 - this.props.allPrice > 0 &&
                                                                <>
                                                                        <span>还差</span>
                                                                        <span>￥</span>
                                                                        <span>{150 - this.props.allPrice}</span>
                                                                        <span>元包邮</span>
                                                                </>}
                                                        </div>
                                                        {150 - this.props.allPrice <= 0 &&
                                                        <div><span>已享免邮费</span></div>}
                                                </div>
                                                }
                                                <div className={style["pay-btn"]}>
                                                        <div onClick={() => this.props.isEdit?this.props.remove(this.props.selectNum):''}
                                                             className={`${style.btn} ${this.props.isEdit?style.remove:style.pay} ${this.props.selectNum >= 1?style.active:''}`}>
                                                                {this.props.isEdit?'删除商品':'现在结算'}
                                                        </div>
                                                </div>
                                        </div>
                                        <div onClick={() => this.props.changeEdit()}
                                             className={style.edit}>{this.props.isEdit?'完成':'编辑'}</div>
                                </>
                                }
                                {!this.props.cart.data.length &&
                                <div className={style.nullCart}>
                                        <div></div>
                                        <p>购物车暂无商品</p>
                                        <p>添加到购物车的商品将会显示在这里</p>
                                        <p>
                                                {!this.props.user.isLogin &&
                                                <Link className={style["login-btn"]} to='/user/login'>现在登录</Link>
                                                }
                                                <Link to='/category'>选购商品</Link>
                                        </p>
                                </div>
                                }
                        </div>
                )
        }

        componentDidUpdate(prevProps, prevState, snapshot){
                //this.initIScroll();
        }

        initIScroll(){
                if(!this.IScrollContent&&!this.IScroll) return;
                imagesLoaded(this.IScrollContent,()=>{
                        this.IScroll = new IScroll(this.IScrollContent,{
                                click:true
                        })
                })
        }
}

export default Main;