import React from 'react'
import Main from '../presitational'
import {connect} from 'react-redux';
import {templateActions} from "../../../store/template";
class Center extends React.Component{
        constructor(props){
                super(props)
        }
        render(){
                return(
                        <Main></Main>
                )
        }
        componentDidMount(){
                this.props.toggleNav();
        }
}
function mapStateToProps(){
        return{

        }
}
function mapDispatchToProps(dispatch){
        return{
                toggleNav:()=>dispatch(templateActions.NAV({Btn:['Text'],textContent:'个人中心'}))
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(Center);