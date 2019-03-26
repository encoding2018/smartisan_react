import React, {Component} from 'react'
import {connect} from 'react-redux';
import {templateActions} from "../../store/template";
import {homeActions} from '../../store/home';
import {categoryActions} from "../../store/category";
import IScroll from 'iscroll';
import imagesLoaded from 'imagesloaded';
import Floor from '../../components/home/floor';
import UpdateBar from '../../components/public/updateBar';
import style from './index.module.styl';
import footerStyle from '../../components/public/footer/index.module.styl';
class FloorPage extends Component{
        constructor(props){
                super(props);
                this.state = {
                        data:{}
                };
        }

        render(){
                return (
                        <>
                                {JSON.stringify(this.state.data)!=='{}'&&
                                        <div className={style.IScrollContent}>
                                                <div>
                                                        <Floor data={this.state.data} template={3} show={0}/>
                                                        <UpdateBar msg='全部加载完成...'/>
                                                </div>
                                        </div>
                                }
                        </>
                )
        }
        componentWillMount(){
                this.changeFooterActive(true);
                this.filterData();
        }
        componentWillUnmount(){
                this.changeFooterActive(false);
                this.IScroll.destroy()
        }
        filterData(){
                   let pageState = /^\/index/.test(this.props.match.url),
                        AllData = pageState ? this.props.home.product : this.props.category.list,
                        curCid = parseInt(this.props.match.params.id),
                        data = AllData.find(item=>item.cid===curCid);
                if(!data){
                        pageState ?
                                this.props.getHomeFloorData(curCid)
                                        .then(()=>{
                                                this.filterData();
                                                this.initIScroll();
                                        }) :
                                this.props.getCategoryFloorData(curCid)
                                        .then(()=>{
                                                this.filterData();
                                                this.initIScroll();
                                        })
                }else{
                        this.setState({data});
                        data&&this.props.toggleNav(data.title);
                        this.initIScroll();
                }
        }
        initIScroll(){
                imagesLoaded(`.${style.IScrollContent}`,()=>{
                        setTimeout(()=>{
                                this.IScroll = new IScroll(`.${style.IScrollContent}`,{
                                        click:true
                                })
                        },100)
                });
        }
        changeFooterActive(state){
                let footerState = /^\/index/.test(this.props.match.url) ? 1 : 2;
                setTimeout(()=>{
                        let dom = document.querySelector(`.${footerStyle.btn}:nth-child(${footerState}) a`);
                        if(!dom) return;
                        dom.className = state ? footerStyle.active : '' ;
                },5);
        }
}

function mapStateToProps({home,category}){
        return{
                home,category
        }
}

function mapDispatchToProps(dispatch){
        return{
                toggleNav:(payload)=>dispatch(templateActions.NAV({Btn:['Back','Text'],textContent:payload})),
                getHomeFloorData:(payload)=>dispatch(homeActions.UPDATE(payload)),
                getCategoryFloorData:(payload)=>dispatch(categoryActions.UPDATE(payload))
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(FloorPage);