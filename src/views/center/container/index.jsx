import React from 'react'
import Main from '../presitational'
import {connect} from 'react-redux';
import {templateActions} from "../../../store/template";
import {userActions} from "../../../store/user";
import icon1 from "../presitational/img/icon_user_1.png";
import icon2 from "../presitational/img/icon_user_2.png";
import icon3 from "../presitational/img/icon_user_3.png";
import icon4 from "../presitational/img/icon_user_4.png";
class Center extends React.Component{
        constructor(props){
                super(props);
                this.state={
                        userState: [
                                {title: '全部订单', img: icon1},
                                {title: '待付款', img: icon2},
                                {title: '待收货', img: icon3},
                                {title: '售后', img: icon4}
                        ],
                        BtnArr: [
                                [
                                        {title: '地址管理', url: '/site'},
                                        {title: '我的优惠券', url: '#'},
                                        {title: '优先购买码', url: '#'},
                                        {title: '提货兑换卡', url: '#'}
                                ],
                                [
                                        {title: '常见问题', url: '#'},
                                        {title: '服务支持', url: '#'},
                                ],
                                [
                                        {title: '意外碎屏险', url: '#'},
                                        {title: '延长保修服务', url: '#'}
                                ]
                        ]
                };
        }
        render(){
                return(
                        <Main
                                username = {this.props.username}
                                isLogin = {this.props.isLogin}
                                state={this.state}>
                        </Main>
                )
        }
        componentDidMount(){
                this.props.toggleNav();
                this.props.getUser();
        }

}
function mapStateToProps({user:{username,isLogin}}){
        return{
                username,isLogin
        }
}
function mapDispatchToProps(dispatch){
        return{
                toggleNav:()=>dispatch(templateActions.NAV({Btn:['Text'],textContent:'个人中心'})),
                getUser:(payload)=>dispatch(userActions.GETUSER(payload))
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(Center);