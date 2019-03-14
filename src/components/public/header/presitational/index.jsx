import React,{Component} from 'react';
import style from './index.module.styl'

class Header extends Component{
        constructor(props){
                super(props);
                this.state = {
                        back:  null,
                        logo: null,
                        menu: null,
                        text: null,
                        edit: null,
                        search:  null,
                        textContent:null,
                }
        }
        componentWillReceiveProps(nextProps){
                let {Back,Logo,Menu,Text,Edit,Search,TextContent} = nextProps.navState;
                this.setState({
                        back: Back ? (<div className={style["back-btn"]}><div>返回</div></div>) : null,
                        logo:Logo ? (<div className={style.logo}></div>) : null,
                        menu:Menu ? (<div  className={style["menu-btn"]}></div>) : null,
                        text:Text ? (<div className={style.text}>{TextContent}</div>) : null,
                        edit:Edit ? (<div className={style.edit}><div>编辑</div></div>) : null,
                        search: Search ? (<div className={style.search}></div>) : null,

                });
        }

        render(){
                let {back,logo,menu,text,edit,search} = this.state;
                return (
                        <>
                                <ul className={style.menu}>
                                        <li className={`${style.left}`}>
                                                {menu}{back}
                                        </li>
                                        <li className={`${style.center}`}>
                                                {text}{logo}
                                        </li>
                                        <li className={`${style.right}`}>
                                                {edit}{search}
                                        </li>
                                </ul>
                        </>
                );
        }
}
export default Header;