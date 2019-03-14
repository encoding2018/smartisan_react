import React from 'react'
import style from './index.module.styl';
class updateBar extends React.Component{
        constructor(props){
                super(props);
        }
        render(){
                return(
                        <>
                                {this.props.msg&&
                                        <div className={style.title}>{this.props.msg}</div>
                                }
                        </>
                )
        }
}
export default updateBar;