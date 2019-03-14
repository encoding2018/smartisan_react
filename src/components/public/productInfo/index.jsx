import React from 'react'
import style from './index.module.styl';
class productInformation extends React.Component{
        constructor(props){
                super(props);
        }
        render(){
                return(
                        <>
                                {this.props.data&&
                                <div className={style.box}>
                                        <div className={`${style.name} ${style.textEllipsis}`}>{this.props.data.name}</div>
                                        <div className={`${style.title} ${style.textEllipsis}`}>{this.props.data.title}</div>
                                        <div className={style.price}><span>￥</span><span>{`${this.props.data.price}.00`}</span></div>
                                </div>
                                }
                        </>
                )
        }
}
export default productInformation;