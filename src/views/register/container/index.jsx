import React, {Component} from 'react';
import Main from '../presitational/Main';
import {connect} from "react-redux";
import http from '../../../utils/http';
import {templateActions} from "../../../store/template";
import {info} from '../../../utils/alert';
import api from '../../../utils/api';
import router from '../../../router';
class register extends Component{
        constructor(props){
                super(props);
                this.state = {
                        username:'',
                        msgCode:'',
                        password:'',
                        subPassword:'',
                        getMsgCodeBtnState:true,
                        registerBtnState:false,
                        agreementState:true,
                        message:'请输入正确的手机号',
                        msgCodeBtnText:'获取验证码',
                };
                this.verify = this.verify.bind(this);
                this.register = this.register.bind(this);
                this.getMsgCode = this.getMsgCode.bind(this);
        }

        render(){
                return (
                        <Main
                                verify={this.verify}
                                register = {this.register}
                                getMsgCode = {this.getMsgCode}
                                {...this.state}
                        ></Main>
                )
        }
        componentDidMount(){
                this.props.toggleNav();
                this.props.footer(false);
        }
        componentWillUnmount(){
                this.props.footer(true);
                clearInterval(this.timer);
        }

        verify(type,value){ //用户输入信息验证中心
                this.setState({[type]:value});
                setTimeout(()=>{
                        let {username,msgCode,password,subPassword,agreementState} = this.state,
                                reg = /(?:^1[3456789]|^9[28])\d{9}$/,
                                setMsg = (msg)=>this.setState({message:msg});
                        this.setState({registerBtnState:false});
                        if(!reg.test(username)) {setMsg('请输入正确的手机号'); return}
                        if(!msgCode) {setMsg('验证码不能为空'); return}
                        if(password.length<=7) {setMsg('密码不得小于8位'); return}
                        if(password!==subPassword) {setMsg('两次密码不一致'); return}
                        if(!agreementState) {setMsg('请阅读并同意此用户协议'); return}
                        this.setState({registerBtnState:true})
                },1)
        }
        register(){ //用户注册
                if(!this.state.registerBtnState) {info(this.state.message); return}
                let {username:phoneCode,msgCode,password} = this.state;
                http(api.user.SIGNUP,{act:'signup',phoneCode,msgCode,password})
                        .then(result=>{if(result.ok) return result.msg; else info(result.msg)})
                        .then(result=>{
                                if(!result){ //注册成功自动登录
                                        router.replace('/');
                                        info('注册成功,已自动登录')
                                }
                        })
        }
        getMsgCode(){ //获取短信验证码
                let {message,username,getMsgCodeBtnState} = this.state;
                if(message==='请输入正确的手机号') {info(message);return}
                if(!getMsgCodeBtnState) return;
                http(api.user.SIGNUP,{act:'acthCode',phoneCode:username})
                        .then(result=>{if(result.ok) return result.msg; else info(result.msg)})
                        .then(result=>{
                                if(result){
                                        info(`短信验证码:${result}`);
                                        let time = 60;
                                        this.timer = setInterval(()=>{
                                                --time;
                                                this.setState({msgCodeBtnText:`重新发送 ${time}`});
                                                if(!time) {clearInterval(this.timer);this.setState({getMsgCodeBtnState:true})}
                                        },1000)
                                }
                        });
        }
}
function mapStateToProps(){
        return{

        }
}
function mapDispatchToProps(dispatch){
        return{
                toggleNav:()=>dispatch(templateActions.NAV({Btn:['Text'],textContent:'注册 Smartisan ID'})),
                footer:(payload)=>dispatch(templateActions.FOOTER(payload)),
        }
}
export default connect(mapStateToProps , mapDispatchToProps)(register);