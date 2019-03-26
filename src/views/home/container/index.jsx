import React,{Component} from 'react'
import { connect } from 'react-redux';
import {homeActions} from '../../../store/home';
import {templateActions} from '../../../store/template';
import Main from '../presitational';
import {userActions} from "../../../store/user";
class Home extends Component{
        render(){
                return(
                        <Main data={this.props.home} update={this.props.update}/>
                )
        }
        componentDidMount(){
                this.props.init();
                this.props.toggleNav();
                this.props.getUser();
        } // 获取主页初始化数据
}

function mapDispatchToProps(dispatch){
        return{
                toggleNav:()=>dispatch(templateActions.NAV({Btn:['Menu','Logo','Search']})),
                init:()=>dispatch(homeActions.INIT()),
                update:()=>dispatch(homeActions.UPDATE()),
                getUser:(payload)=>dispatch(userActions.GETUSER(payload))

        }
}

function mapStateToProps({home}){
        return{
                home
        }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);