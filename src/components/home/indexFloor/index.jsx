import React from 'react'
import {Link} from 'react-router-dom';
import TitleBar from '../../public/titleBar';
import Productinfo from '../../public/productInfo';
import style from './index.module.styl';
import IScroll from 'iscroll'
import imagesLoaded from 'imagesloaded';
class indexFloor extends React.Component{
        constructor(props){
                super(props)
        }
        render(){
                return(
                        <>
                                {this.props.data && <div>
                                        <TitleBar title={this.props.data.title} cid={this.props.data.cid}/>
                                        <div className={`${style.content} `}>
                                                <ul className={`${style[`content${this.props.template}`]}`}>
                                                        {this.props.data.data.map((item,i)=>{
                                                                if(i>=this.props.show) return;
                                                                return (
                                                                        <li key={i}>
                                                                                <Link to={`/product/${item.id}`}>
                                                                                        <div className={style["img-box"]}>
                                                                                                <img src={item.avatar} alt=""/>
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
                if(this.props.data) this.initIScroll();
        }

        componentDidUpdate(prevProps, prevState, snapshot){
                this.initIScroll();
        }
        initIScroll(){
                        if(!this.IScroll && this.props.template!==1) return;
                        let dom = document.getElementsByClassName(style.content),
                                child = document.querySelector(`.${style.content} ul`),
                                liDom = document.querySelector(`.${style.content} li`);
                        child.style.width = `${liDom.offsetWidth*this.props.show}px`;
                        imagesLoaded(dom,()=>{
                                this.IScroll = new IScroll(`.${style.content}`,{
                                        scrollX:true,
                                        scroll:false,
                                        click:true,
                                })
                        })
        }
}
export default indexFloor;