import React, {Component} from 'react'
import {connect} from 'react-redux';
import {templateActions} from "../../../store/template";
import Main from '../presitational/Main';
import http from '../../../utils/http';
import router from '../../../router';
import {info} from '../../../utils/alert';
import api from  '../../../utils/api';
class changePwd extends Component{
        constructor(props){
                super(props);
                this.state = {
                        changeState:1,
                        svg:'',
                        svgCode:0,
                        username:'',
                        initialCode:'',
                        msgCode:'',
                        password:'',
                        subPassword:'',
                        initialBtnState:false,
                        message:'',
                        getMsgCodeBtnText:'获取验证码',
                        verifyBtnState:false,
                        getMsgCodeBtnState:true,
                        changeBtnState:false,
                };
                this.getPictureCode = this.getPictureCode.bind(this);
                this.verify = this.verify.bind(this);
                this.initialBtn = this.initialBtn.bind(this);
                this.verifyBtn = this.verifyBtn.bind(this);
                this.getMsgCode = this.getMsgCode.bind(this);
                this.changeBtn = this.changeBtn.bind(this);
        }

        render(){
                return (
                        <Main
                                {...this.state}
                                initialBtn = {this.initialBtn}
                                verify = {this.verify}
                                getMsgCode = {this.getMsgCode}
                                verifyBtn = {this.verifyBtn}
                                changeBtn = {this.changeBtn}
                                getPictureCode={this.getPictureCode}></Main>
                )
        }
        componentDidMount(){
                this.props.toggleNav('找回密码');
                this.props.footer(false);
                this.getPictureCode();
                this.verify('initial');
        }
        componentWillUnmount(){
                this.props.footer(true);
                clearInterval(this.timer);
        }
        getPictureCode(){ //获取图片验证码
                http(api.user.CHANGEPWD,{act:'pictureAuth'})
                        .then(result=>{
                                this.setState({svgCode:result.text,svg:result.data});
                        })
        }
        verify(state,type,value){
                if(type) this.setState({[type]:value});
                setTimeout(()=>{
                        let {username,initialCode,msgCode,password,subPassword} = this.state,reg = /(?:^1[3456789]|^9[28])\d{9}$/,
                                setMsg = (msg)=>{this.setState({message:msg})};
                        switch(state){
                                case 'initial':
                                        this.setState({initialBtnState:false});
                                        if(!reg.test(username)) { setMsg('请输入正确的手机号'); return }
                                        if(!initialCode) { setMsg('验证码不能为空'); return }
                                        this.setState({initialBtnState:true});
                                        break;
                                case 'verify':
                                        this.setState({verifyBtnState:false});
                                        if(!msgCode) {setMsg('验证码不能为空'); return }
                                        this.setState({verifyBtnState:true});
                                        break;
                                case 'change':
                                        this.setState({changeBtnState:false});
                                        if(password.length <= 7) {setMsg('密码不能小于8位'); return }
                                        if(password!==subPassword) {setMsg('两次密码不相等'); return }
                                        this.setState({changeBtnState:true});
                                        break;
                                default:break;
                        }
                },1);
        }
        initialBtn(){ //初始化验证
                let {initialBtnState,message,initialCode,svgCode,username:phoneCode} = this.state,clearInput;
                if(!initialBtnState) { info(message); return }
                if(initialCode===svgCode){
                        http(api.user.CHANGEPWD,{act:'initialVerifyUser',phoneCode})
                                .then(result=>{
                                        if(result.ok){this.setState({changeState:2});
                                        this.verify('verify');
                                        this.props.toggleNav('安全验证');}
                                        else{info('该用户不存在');clearInput(true);}
                                })

                }else {
                        info('验证码错误');
                        this.setState({initialCode:'',initialBtnState:false});
                        this.getPictureCode();
                        document.querySelector('[name=initialCode]').value='';
                }
                clearInput = (state)=>{
                        this.getPictureCode();
                        let {username} = this.state;
                        this.setState({initialCode:state?username:'',initialBtnState:false});
                        document.querySelector('[name=initialCode]').value = '';
                        if(state) document.querySelector('[name=initialUsername]').value = '';
                }
        }
        getMsgCode(){
                let {username:phoneCode,getMsgCodeBtnState} = this.state;
                if(!getMsgCodeBtnState) return;
                http(api.user.CHANGEPWD,{act:'noteAuth',phoneCode})
                        .then(result=>info(`手机验证码: ${result.Code}`))
                        .then(()=>{
                                this.setState({getMsgCodeBtnState:false});
                                let time = 60;
                                this.timer = setInterval(()=>{
                                        --time;
                                        this.setState({getMsgCodeBtnText:`重新发送 ${time}`});
                                        if(time===0) {
                                                clearInterval(this.timer);
                                                this.setState({getMsgCodeBtnState:true,getMsgCodeBtnText:'获取验证码'})
                                        }
                                },1000)
                        })
        }
        verifyBtn(){
                let {verifyBtnState,msgCode:authCode,message,username:phoneCode} = this.state;
                if(!verifyBtnState) { info(message); return }
                http(api.user.CHANGEPWD,{act:'judgeAuth',authCode,phoneCode})
                        .then(result=>{
                                if(result.ok){
                                        this.setState({changeState:3});
                                        this.verify('change');
                                        this.props.toggleNav('修改密码');
                                }else info(result.msg);
                        })
        }
        changeBtn(){
                let {changeBtnState,message,password:pwd} = this.state;
                if(!changeBtnState) {info(message); return}
                http(api.user.CHANGEPWD,{act:'changePwd',pwd})
                        .then(result=>{
                                if(result.ok){
                                        info('修改密码成功');
                                        router.replace('/user/login')
                                }else info(result.msg);
                        })
        }
}
function mapStateToProps(){
        return{

        }
}
function mapDispatchToProps(dispatch){
        return{
                toggleNav:(payload)=>dispatch(templateActions.NAV({Btn:['Text'],textContent:payload})),
                footer:(payload)=>dispatch(templateActions.FOOTER(payload)),
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(changePwd);