import React, {Component} from 'react'
import Main from '../presitational'
import {connect} from "react-redux";
import {templateActions} from "../../../store/template";
import {siteActions} from '../../../store/site'
class site extends Component{
        constructor(props){
                super(props);
                this.state = {};
        }

        render(){
                return (
                        <Main {...this.props}></Main>
                )
        }

        componentDidMount(){
                this.props.toggleNav();
                this.props.footer(false);
                this.props.getSite();
        }

        componentWillUnmount(){
                this.props.footer(true);
        }
}

function mapStateToProps({site}){
        return {
                site
        }
}

function mapDispatchToProps(dispatch){
        return {
                toggleNav: () => dispatch(templateActions.NAV({Btn: ['Back', 'Text'], textContent: '地址列表'})),
                footer: (payload) => dispatch(templateActions.FOOTER(payload)),
                getSite:()=>dispatch(siteActions.INIT())
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(site);