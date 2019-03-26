import React, {Component} from 'react'
import {connect} from 'react-redux';
import style from '../presitational/index.module.styl';
import {Link} from 'react-router-dom';
import {info} from '../../../utils/alert';
import http from '../../../utils/http';
import api from '../../../utils/api';
import router from '../../../router';
import {templateActions} from "../../../store/template";
import {userActions} from "../../../store/user";
import Main from '../presitational';
import {cartActions} from "../../../store/cart";
class Login extends Component{
        constructor(props){
                super(props);
                this.state = {
                        loginBtnState:false,
                        message:'请输入正确的手机号',
                        username:'',
                        password:''
                };
                this.verify = this.verify.bind(this);
                this.login = this.login.bind(this);
        }

        render(){
                return (
                        <Main
                                verify= {this.verify}
                                login = {this.login}
                                {...this.state}
                        />
                )
        }
        componentDidMount(){
                this.props.toggleNav();
                this.props.footer(false);
        }
        componentWillUnmount(){
                this.props.footer(true);
        }
        verify(type,value){
                this.setState({[type]:value});
                setTimeout(()=>{
                        this.setState({loginBtnState:false});
                        let {username,password} = this.state,
                                reg = /(?:^1[3456789]|^9[28])\d{9}$/;
                        if(!reg.test(username)){this.setState({message:'请输入正确的手机号'});return}
                        if(!password) {this.setState({message:'密码不能为空'});return}
                        this.setState({loginBtnState:true});
                },1);
        }
        login(){
                if(!this.state.loginBtnState){ info(this.state.message,2000); return}
                let {username,password} = this.state;
                http(api.user.LOGIN,{username,password})
                        .then(result=>{
                                if(result.ok){
                                        info('登陆成功');
                                        router.replace('/center');
                                        this.props.setUser(username);
                                        this.props.openInit();
                                }
                                else
                                        info(result.msg)
                        })
        }
}
function mapDispatchToProps(dispatch){
        return{
                toggleNav:()=>dispatch(templateActions.NAV({Btn:['Text'],textContent:'登录官网'})),
                footer:(payload)=>dispatch(templateActions.FOOTER(payload)),
                setUser:(payload)=>dispatch(userActions.SETUSER(payload)),
                openInit:()=>dispatch(cartActions.OPENINIT())
        }
}

export default connect(null,mapDispatchToProps)(Login);