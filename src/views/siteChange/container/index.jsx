import React, {Component} from 'react'
import Main from '../presitational';
import {templateActions} from "../../../store/template";
import siteData from '../../../utils/siteData';
import {siteActions} from "../../../store/site";
import {connect} from "react-redux";
class siteChange extends Component{
        constructor(props){
                super(props);
                this.state = {
                        provinceArr:[],
                        cityArr:[],
                        areaArr:[],
                        province:'',
                        city:'',
                        area:''
                };
                this.changeProvince = this.changeProvince.bind(this);
                this.changeCity = this.changeCity.bind(this);
        }

        render(){
                return (
                        <Main {...this.state} {...this}></Main>
                )
        }

        componentDidMount(){
                this.props.toggleNav('新增地址');
                this.props.footer(false);
                let temp = [];for (let i in siteData){temp.push(i)}
                this.setState({provinceArr:temp})
        }

        componentWillUnmount(){
                this.props.footer(true);
        }

        changeProvince(province){
                let temp = [];
                for (let i in siteData[province]){temp.push(i)}
                this.setState({cityArr:temp,province});
        }

        changeCity(city){
                this.setState({areaArr:siteData[this.state.province][city]})
        }
}
function mapStateToProps({site}){
        return {
                site
        }
}

function mapDispatchToProps(dispatch){
        return {
                toggleNav: (payload) => dispatch(templateActions.NAV({Btn: ['Back', 'Text'], textContent: payload})),
                footer: (payload) => dispatch(templateActions.FOOTER(payload)),
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(siteChange);