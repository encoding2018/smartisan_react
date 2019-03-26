import React, {Component} from 'react'
import style from './index.module.styl';
import {connect} from 'react-redux';
class alert extends Component{
        constructor(props){
                super(props);
                this.state = {

                };
        }

        render(){
                return (
                        <>
                                <div className={`${style.info} ${this.props.infoShow ? style.active : style.hide}`}>{this.props.infoMsg}</div>
                        </>
                )
        }
}
function mapStateToProps({template}){
        return{
                infoShow:template.infoShow,
                infoMsg:template.infoMsg
        }
}

export default connect(mapStateToProps,null)(alert);