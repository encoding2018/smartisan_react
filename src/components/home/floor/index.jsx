import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import TitleBar from '../../public/titleBar';
import Productinfo from '../../public/productInfo';
import style from './index.module.styl';
import IScroll from 'iscroll'
import imagesLoaded from 'imagesloaded';
class indexFloor extends Component{
        constructor(props){
                super(props);

        }
        render(){
                return(
                        <>
                                {this.props.data && <div>
                                        {this.props.show!==0&&<TitleBar title={this.props.data.title} cid={this.props.data.cid}/>}
                                        <div className={`${style.content} `} ref={(dom)=>this.IScrollContent=dom}>
                                                <ul className={`${style[`content${this.props.template}`]}`}>
                                                        {this.props.data.data.map((item,i)=>{
                                                                if(i>=this.props.show&&this.props.show!==0) return;
                                                                        return (
                                                                                <li key={i}>
                                                                                        <Link to={`/product/${item.id}`}>
                                                                                                <div className={style["img-box"]}>
                                                                                                        <div>
                                                                                                                <img src={item.avatar} alt=""/>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className={style["text-box"]}>
                                                                                                        <Productinfo data={item}/>
                                                                                                </div>
                                                                                        </Link>
                                                                                </li>
                                                                        )
                                                        })}
                                                </ul>
                                        </div>
                                </div>}
                        </>
                )
        }
        componentDidMount(){
                this.props.data && this.initIScroll();
        }

        shouldComponentUpdate(nextProps, nextState, nextContext){
                return nextProps.data!==this.props.data;
        }

        componentDidUpdate(prevProps, prevState, snapshot){
                this.props.data && this.initIScroll();

        }
        initIScroll(){
                if(this.props.template!==1) return;
                if(!this.contentIScroll){
                        let child = this.IScrollContent.children[0],
                                liDom = child.children[0];
                        child.style.width = `${liDom.offsetWidth*this.props.show}px`;
                        imagesLoaded(child,()=>{
                                if(this.IScrollContent){
                                        this.contentIScroll = new IScroll(this.IScrollContent,{
                                                scrollX:true,
                                                scroll:false,
                                                click:true,
                                        });
                                }
                        });
                }
        }
}
export default indexFloor;