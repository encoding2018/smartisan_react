import React from 'react'
import {connect} from 'react-redux'
import Main from '../presitational'
import {templateActions} from "../../../store/template";
class category extends React.Component{
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
                toggleNav:()=>dispatch(templateActions.NAV({Btn:['Menu','Text','Search'],textContent:'分类'}))
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(category);