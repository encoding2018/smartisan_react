import React, {Component} from 'react'
import style from './index.module.styl';
import {Link} from 'react-router-dom';
import IScroll from 'iscroll/build/iscroll-probe';
import imagesLoaded from 'imagesloaded';
import Floor from '../../../components/home/floor';
import Poster from '../../../components/home/poster';
import UpateBar from '../../../components/public/updateBar';
import footerStyle from '../../../components/public/footer/index.module.styl';
class Main extends Component{
        constructor(props){
                super(props);
                this.state = {
                        bannerState: {
                                curIndex: 0,
                        },
                        update:true,
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
                                                                                                <img src={item.avatar} alt=""/>
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
                                                                                                <div><img src={item.avatar} alt=""/></div>
                                                                                                <span>{item.name}</span>
                                                                                        </Link>
                                                                                </li>
                                                                        ))}
                                                                </ul>
                                                        </div>
                                                </div>
                                                <Floor data={this.props.data.product[0]} template={1} show={6}/>
                                                <Poster data={this.props.data.poster.top} template={1}/>
                                                {this.props.data.product[1]&&<Floor data={this.props.data.product[1]} template={2} show={6}/>}
                                                {this.props.data.product[2]&&<Floor data={this.props.data.product[2]} template={1} show={6}/>}
                                                {this.props.data.product[3]&&<Floor data={this.props.data.product[3]} template={2} show={6}/>}
                                                {this.props.data.product[4]&&<Floor data={this.props.data.product[4]} template={2} show={6}/>}
                                                {this.props.data.product[5]&&<Floor data={this.props.data.product[5]} template={3} show={6}/>}
                                                {this.props.data.product[6]&&<Floor data={this.props.data.product[6]} template={2} show={6}/>}
                                                {this.props.data.curId>=8&&<Poster data={this.props.data.poster.bottom} template={2}/>}
                                                {this.props.data.curId!==8&&<UpateBar msg={this.state.updateMsg}/>}
                                        </div>
                                </div>
                        </>
                )
        }

        componentDidMount(){
                if(this.props.data)this.initBannerIScroll();
                if(this.props.data)this.InitContentIScroll();
                this.addActive();
        }

        componentDidUpdate(prevProps, prevState, snapshot){
                this.initBannerIScroll();
                this.InitContentIScroll();
        }

        initBannerIScroll(){
                let Box = document.getElementById('bannerIScroll');
                imagesLoaded(Box, () => {
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
                                bounce:false,
                                click: true,
                                probeType:3
                        });
                        let {contentIScoll} = this;
                        contentIScoll.on('scroll',()=>{
                                if(this.props.data.curId>=8) return;
                                if(contentIScoll.y!==0){
                                        if(contentIScoll.y-contentIScoll.maxScrollY <= 50&&this.state.update){
                                                this.setState({update:false}); //进入更新状态
                                                this.props.update()
                                                        .then(()=>{
                                                                imagesLoaded(content,()=>{
                                                                        contentIScoll.refresh();
                                                                        this.setState({update:true});   //更新状态结束
                                                                });
                                                        });
                                        }
                                }
                        })
                   });
        }
        addActive(){
                setTimeout(()=>{
                        document.querySelector(`.${footerStyle.btn}:nth-child(1) a`).className=footerStyle.active;
                },20)
        }
}


export default Main;