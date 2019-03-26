import React from 'react'
import {connect} from 'react-redux'
import Main from '../presitational'
import {templateActions} from "../../../store/template";
import {categoryActions} from '../../../store/category';
import {userActions} from "../../../store/user";
class category extends React.Component{
        constructor(props){
                super(props)
        }
        render(){
                return(
                        <Main data={this.props.category} update={this.props.update}></Main>
                )
        }
        componentDidMount(){
                this.props.toggleNav();
                this.props.init();
                this.props.getUser();
        }
}
function mapStateToProps({category}){
        return{category}
}

function mapDispatchToProps(dispatch){
        return{
                toggleNav:()=>dispatch(templateActions.NAV({Btn:['Menu','Text','Search'],textContent:'分类'})),
                init:()=>dispatch(categoryActions.INIT()),
                update:()=>dispatch(categoryActions.UPDATE()),
                getUser:(payload)=>dispatch(userActions.GETUSER(payload))
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(category);