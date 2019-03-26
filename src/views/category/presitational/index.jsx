import React from 'react'
import style from './index.module.styl';
import Floor from '../../../components/category/floor/main';
import imagesLoaded from 'imagesloaded';
import IScroll from "iscroll/build/iscroll-probe";
import UpateBar from '../../../components/public/updateBar';
import footerStyle from "../../../components/public/footer/index.module.styl";
class Main extends React.Component{
        constructor(props){
                super(props);
                this.state={
                        update:true,
                        updateMsg:'正在加载...'
                }
        }

        render(){
                return (
                        <div className={style.scrollContent}>
                                <div className={style.subContent}>
                                        <Floor data={this.props.data.list[0]} template={1} show={2}/>
                                        <Floor data={this.props.data.list[1]} template={2} show={4}/>
                                        <Floor data={this.props.data.list[2]} template={3} show={9}/>
                                        <Floor data={this.props.data.list[3]} template={3} show={6}/>
                                        <Floor data={this.props.data.list[4]} template={2} show={6}/>
                                        <Floor data={this.props.data.list[5]} template={2} show={2}/>
                                        <Floor data={this.props.data.list[6]} template={2} show={6}/>
                                        <Floor data={this.props.data.list[7]} template={2} show={2}/>
                                        <Floor data={this.props.data.list[8]} template={3} show={9}/>
                                        <Floor data={this.props.data.list[8]} template={2} show={4}/>
                                        {this.props.data.curId!==10&&<UpateBar msg={this.state.updateMsg}/>}
                                </div>
                        </div>
                )
        }
        componentDidMount(){
                if(this.props.data)this.InitContentIScroll();
                this.addActive();
        }

        componentDidUpdate(prevProps, prevState, snapshot){
                this.InitContentIScroll();
        }
        componentWillUnmount(){
                clearInterval(this.timer);
        }

        InitContentIScroll(){
                if(this.contentIScoll)return;
                imagesLoaded(`.${style.scrollContent}`,()=>{
                        if(!document.querySelector(`.${style.scrollContent}`)) return;
                        this.contentIScoll = new IScroll(`.${style.scrollContent}`,{
                                scrollY:true,
                                mouseWheel: true,
                                useTransition:false,
                                bounce:false,
                                click: true,
                                tap: true,
                                probeType:3,
                        });
                        let {contentIScoll} = this;
                        contentIScoll.on('scroll',()=>{              //懒加载
                                if(this.props.data.curId>=10) return;
                                if(contentIScoll.y !== 0){
                                        if(contentIScoll.y-contentIScoll.maxScrollY<=100&&this.state.update){
                                                this.setState({update:false}); //进入更新状态
                                                this.props.update()
                                                        .then(()=>{
                                                                imagesLoaded(`.${style.scrollContent}`,()=>{
                                                                        this.contentIScoll.refresh();
                                                                        this.setState({update:true}); //结束更新状态
                                                                })
                                                        });
                                        }
                                }
                        });
                })
        }
        addActive(){
                setTimeout(()=>{
                        document.querySelector(`.${footerStyle.btn}:nth-child(2) a`).className=footerStyle.active;
                },20)
        }
}

export default Main;