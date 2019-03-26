import React from 'react'
import {Link} from 'react-router-dom';
import TitleBar from '../../../public/titleBar';
import style from './index.module.styl';
import ChildBar from '../child/childBar';

class floor extends React.Component{
        constructor(props){
                super(props);
        }
        render(){
                return(
                        <>
                                {this.props.data&&
                                        <>
                                                <div className={style.content}>
                                                        <TitleBar title={this.props.data.title}/>
                                                        <div className={style.avatar}>
                                                                <Link to={`/category/list/${this.props.data.cid}`}>
                                                                        <div>
                                                                                <img src={this.props.data.avatar} alt=""/>
                                                                        </div>
                                                                </Link>
                                                        </div>
                                                        <div>
                                                                {this.props.template<=2&&
                                                                        <ul className={this.props.template===2?style.w50:style.w100}>
                                                                                {this.props.data.data.map((item,i)=>{
                                                                                        if(i>=this.props.show) return;
                                                                                        return(
                                                                                                <li key={i}>
                                                                                                        <Link to={`product/${item.id}`}>
                                                                                                                <ChildBar data={item}/>
                                                                                                        </Link>
                                                                                                </li>
                                                                                        )
                                                                                })}
                                                                        </ul>
                                                                }
                                                                {this.props.template ===3&&
                                                                        <ul className={style.template3}>
                                                                                {this.props.data.data.map((item,i)=>{
                                                                                        if(i>=this.props.show) return;
                                                                                        return(
                                                                                                <li key={i}>
                                                                                                        <Link to={`/product/${item.id}`}>
                                                                                                                <div className={style.imgBox}>
                                                                                                                        <img src={item.avatar} alt=""/>
                                                                                                                </div>
                                                                                                                <div className={style.nameBox}>{item.name}</div>
                                                                                                        </Link>
                                                                                                </li>
                                                                                        )
                                                                                })}
                                                                        </ul>
                                                                }
                                                        </div>
                                                </div>
                                        </>
                                }
                        </>

                )
        }
        componentDidMount(){
        }
        componentWillReceiveProps(nextProps, nextContext){
        }
        componentDidUpdate(prevProps, prevState, snapshot){
        }
}
export default floor;