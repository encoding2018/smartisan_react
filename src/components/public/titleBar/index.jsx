import React from 'react';
import {Link} from 'react-router-dom'
import style from './index.module.styl';

class TitleBar extends React.Component{
        constructor(props){
                super(props);
        }
        render(){
                return(
                        <div className={style.title}>
                                <Link to={`/index/floor/${this.props.cid}` || '#'}>
                                        <p className={style.titleText}>
                                                {this.props.title}
                                        </p>
                                        <p className={style.productText}></p>
                                </Link>
                        </div>
                )
        }
        componentDidMount(){

        }
}

export default TitleBar