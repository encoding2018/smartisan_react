import React, {Component} from 'react'
import style from './index.module.styl';
import {Link} from 'react-router-dom';
import IScroll from 'iscroll';
import imagesLoaded from 'imagesloaded';
import Floor from '../../../components/home/indexFloor';
import Poster from '../../../components/home/poster';
import UpateBar from '../../../components/public/updateBar';
class Main extends Component{
        constructor(props){
                super(props);
                this.state = {
                        bannerState: {
                                curIndex: 0,
                        },
                        update:{
                                state:true,
                        },
                        updateMsg:'正在加载...',
                }
        }
        render(){
                return (
                        <>
                                <div className={style.scrollContent}>
                                        <div className='subContent'>
                                                <div className={style.banner}>
                                                        <div className={style.bannerContent} id='bannerIScroll'>
                                                                <ul className={style.imgBox} id='subBannerIScroll'>
                                                                        {this.props.data.banner.map((item, i) => (
                                                                                <li key={i}>
                                                                                        <Link to={item.url}>
                                                                                                <img src={item.avatar}
                                                                                                     alt=""/>
                                                                                        </Link>
                                                                                </li>
                                                                        ))}
                                                                </ul>
                                                                <ul className={style.indexBox}>
                                                                        {this.props.data.banner.map((item, i) => (
                                                                                <li key={i}
                                                                                    className={this.state.bannerState.curIndex === i?style.active:''}></li>
                                                                        ))}
                                                                </ul>
                                                        </div>
                                                        <div className={style['banner-menu']}>
                                                                <ul>
                                                                        {this.props.data.bannerMenu.map((item, i) => (
                                                                                <li key={i}>
                                                                                        <Link to={item.url}>
                                                                                                <div><img
                                                                                                        src={item.avatar}
                                                                                                        alt=""/></div>
                                                                                                <span>{item.name}</span>
                                                                                        </Link>
                                                                                </li>
                                                                        ))}
                                                                </ul>
                                                        </div>
                                                </div>
                                                <Floor data={this.props.data.product[0]} template={1} show={6}/>
                                                <Poster data={this.props.data.poster.top} template={1}/>
                                                <Floor data={this.props.data.product[1]} template={2} show={6}/>
                                                <Floor data={this.props.data.product[2]} template={3} show={6}/>
                                                <Floor data={this.props.data.product[3]} template={2} show={6}/>
                                                <Floor data={this.props.data.product[4]} template={2} show={6}/>
                                                <Floor data={this.props.data.product[5]} template={3} show={6}/>
                                                <Floor data={this.props.data.product[6]} template={2} show={6}/>
                                                {this.props.data.curId>=8&&<Poster data={this.props.data.poster.bottom} template={2}/>}
                                                {this.props.data.curId!==8&&<UpateBar msg={this.state.updateMsg}/>}
                                        </div>
                                </div>
                        </>
                )
        }

        componentDidMount(){
                this.initBannerIScroll();
                this.InitContentIScroll();
        }
        componentWillReceiveProps(nextProps){
                this.initBannerIScroll();
        }
        componentDidUpdate(prevProps, prevState, snapshot){
                this.InitContentIScroll();
        }
        initBannerIScroll(){
                let Box = document.getElementById('bannerIScroll'),
                        child = document.getElementById('subBannerIScroll');
                imagesLoaded(Box, () => {
                        child.style.width = `${this.props.data.banner.length}00%`;
                        setTimeout(() => {
                                if(this.bannerScroll) this.bannerScroll.refresh();
                                else{
                                        this.bannerScroll = new IScroll(Box, {
                                                loop: true,
                                                scrollX: true,
                                                scrollY: false,
                                                snap: true,
                                                momentum: false
                                        });
                                        let {bannerScroll} = this;
                                        bannerScroll.on('scrollEnd', () => {
                                                this.setState({bannerState: {curIndex: bannerScroll.currentPage.pageX}});
                                        });
                                }
                        }, 10);
                })
        }
        InitContentIScroll(){
                if(this.contentIScoll&&this.props.data) return;
                let content = document.querySelector(`.${style.scrollContent}`);
                imagesLoaded(content,()=>{
                        this.contentIScoll = new IScroll(content,{
                                scrollY:true,
                                mouseWheel: true,
                                useTransition:false,
                                click: true,
                                tap: true,
                        });
                        let {contentIScoll} = this;
                        contentIScoll.on('scrollEnd',()=>{ //懒加载
                                if(this.props.data.curId>=8) return;
                                if(contentIScoll.y!==0){
                                        let childHeight = content.children[0].offsetHeight,
                                                wrapperHeight = contentIScoll.wrapperHeight,
                                                curY = contentIScoll.y,
                                                {state}=this.state.update;
                                        if(childHeight-wrapperHeight+curY<=100&&state){
                                                this.setState({update:{state:false}}); //进入更新状态
                                                this.props.update()
                                                        .then(()=>{
                                                                this.setState({update:{state:true}});//更新状态结束
                                                                imagesLoaded(content,()=>{contentIScoll.refresh();});
                                                        });
                                        }
                                }
                        });
                   });
        }
}


export default Main;