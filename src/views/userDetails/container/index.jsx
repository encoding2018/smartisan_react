import React, {Component} from 'react'
import Main from '../presitational';
import {connect} from "react-redux";
import {templateActions} from "../../../store/template";
import {cartActions} from "../../../store/cart";
import {userActions} from "../../../store/user";
import http from '../../../utils/http';
import api from '../../../utils/api';
import {info} from '../../../utils/alert';
import router from '../../../router';

class userDetails extends Component{
        constructor(props){
                super(props);
                this.state = {};
                this.logout = this.logout.bind(this);
        }

        render(){
                return (
                        <Main {...this.props} logout = {this.logout}></Main>
                )
        }

        componentDidMount(){
                this.props.toggleNav();
                this.props.footer(false);
        }

        componentWillUnmount(){
                this.props.footer(true);
        }

        logout(){
                http(api.user.LOGOUT)
                        .then(result=>{
                                if(result.ok){
                                        this.props.openCartInit();
                                        this.props.logout();
                                        info('退出登录成功');
                                        router.replace('/center');
                                }
                        })
        }
}

function mapStateToProps({user}){
        return{
                user
        }
}

function mapDispatchToProps(dispatch){
        return{
                toggleNav:()=>dispatch(templateActions.NAV({Btn:['Back','Text'],textContent:'用户详情'})),
                footer:(payload)=>dispatch(templateActions.FOOTER(payload)),
                openCartInit:()=>dispatch(cartActions.OPENINIT()),
                logout:()=>dispatch(userActions.LOGOUT())
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(userDetails);