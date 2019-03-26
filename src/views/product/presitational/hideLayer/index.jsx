import React, {Component} from 'react';
import style from './index.module.styl';
import TitleBar from '../../../../components/public/titleBar';
import IScroll from 'iscroll';
class hideLayer extends Component{
        constructor(props){
                super(props);
                this.state = {
                        color:'',
                        type:'',
                        size:'',
                };
        }

        render(){
                return (
                        <>
                                <div className={`${style.changeTypeMenu} ${this.props.hideLayerState ? style.typeMenuShow:style.typeMenuHide}`}>
                                        <div className={style.top}>
                                                <div className={style["img-box"]}>
                                                        <div>
                                                                <img src={this.props.curProduct.avatar} alt=""/>
                                                        </div>
                                                </div>
                                                <div className={style["msg-box"]}>
                                                        <div className={style.name}>
                                                                {this.props.list.name}
                                                        </div>
                                                        <div className={style.title}>
                                                                {this.props.list.title}
                                                        </div>
                                                        <div className={style.price}>
                                                                {`￥${this.props.curProduct.price}.00`}
                                                        </div>
                                                </div>
                                        </div>
                                        <div className={style.typeMenuBox} ref={dom=>this.typeIScroll=dom}>
                                                <div>
                                                        {this.props.typeArr.map((item,i)=>(
                                                                <div key={i}>
                                                                        <TitleBar title={`选择${item.title}`}/>
                                                                        <div className={style.typeBox}>
                                                                                {item.data.map((v,i)=>(
                                                                                        <div
                                                                                                key={i}
                                                                                                onClick={(e)=>this.toggleType(e,item.type)}
                                                                                                className={v === this.props.curProduct[item.type] ? style.active:''}>
                                                                                                {v}
                                                                                        </div>
                                                                                ))}
                                                                        </div>
                                                                </div>
                                                        ))}
                                                        <div>
                                                                <TitleBar title={`选择数量`}/>
                                                                <div className={style.countBtnBox}>
                                                                        <div onClick={()=>this.props.selectQuantity>1&&this.props.changeSelectQuantity(false)}/>
                                                                        <div>{this.props.selectQuantity}</div>
                                                                        <div onClick={()=>this.props.selectQuantity<3&&this.props.changeSelectQuantity(true)}/>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className={`${style["mask-layer"]} ${this.props.hideLayerState ? style.maskShow:style.maskHide}`} onClick={()=>this.props.changeHideLayerState(false)}></div>
                        </>
                )
        }

        componentDidMount(){
                this.initCurType();
                this.initTypeIScroll();
        }
        componentWillUnmount(){
                this.IScroll.destroy();
        }
        initCurType(){
                let {color,size,type} = this.props.curProduct;
                this.setState({color, size, type});
        }
        toggleType(e,state){
                let text = e.target.innerText;
                this.setState({[state]:text});
                setTimeout(()=>{
                        let {color,size,type} = this.state;
                        this.props.changeCurProduct(this.props.list.data.find(item=>item.color === color&&item.type ===  type&&item.size === size));
                },1);
        }
        initTypeIScroll(){
                this.IScroll = new IScroll(this.typeIScroll,{
                        click:true
                })
        }
}

export default hideLayer;