import React, {Component} from 'react'
import {connect} from 'react-redux';
import Main from '../presitational/Main'
import {productActions} from '../../../store/product';
import {templateActions} from "../../../store/template";
import {cartActions} from "../../../store/cart";
import {info} from '../../../utils/alert';
import http from '../../../utils/http';
import api from '../../../utils/api';

class Product extends Component{
        constructor(props){
                super(props);
                this.state = {
                        list:{},
                        curProduct:{},
                        selectQuantity:1,
                };
                this.changeCurProduct=this.changeCurProduct.bind(this);
                this.changeSelectQuantity = this.changeSelectQuantity.bind(this);
                this.addCart = this.addCart.bind(this);
        }

        render(){
                return (
                        <Main{...this.props}{...this}{...this.state}></Main>
                )
        }

        componentDidMount(){
                this.props.getProduct(parseInt(this.props.match.params.id))
                        .then(()=>{this.InitData();});
                this.props.footer(false);
        }

        componentWillUnmount(){
                this.props.footer(true);
        }

        InitData(){
                let {list} = this.props.product;
                this.props.toggleNav(list.name);
                this.setState({
                        list,
                        typeArr:typeArr(list.data),
                        curProduct:list.data.find(item=>item.id===parseInt(this.props.match.params.id))
                });
                function typeArr(data){
                        let temp = [],
                                typeArr = [{type:'type',name:'版本'},{type:'color',name:'颜色'},{type:'style',name:'款式'}
                                        ,{type:'size',name:'尺寸'},{type:'edition',name:'版本'}];
                        for(let i = 0;i<typeArr.length;i++){
                                let state = true,tempObj = {},tempData=[];
                                for(let j =0;j<data.length;j++){
                                        let curType = data[j][typeArr[i].type];if(curType===null){state=false;break}
                                        tempObj.title = typeArr[i].name;tempObj.type = typeArr[i].type;
                                        if(tempData.indexOf(curType)===-1) tempData.push(curType);
                                }
                                tempObj.data = tempData;if(state) temp.push(tempObj);
                        } return temp;
                }
        }

        changeCurProduct(type){
                this.setState({curProduct:type})
        }

        reduce(){

        }
        addCart(){
                let {curProduct,selectQuantity:num} = this.state;
                http(api.cart.ADD,{pid:curProduct.id,num})
                        .then(result=>{
                                if(result.ok){
                                        info(result.msg);
                                        this.props.openCartInit();
                                }else info(result.msg)
                        })
        }
        changeSelectQuantity(state){
                let {selectQuantity} = this.state;
                this.setState({selectQuantity:state?selectQuantity+1:selectQuantity-1});
        }
}
function mapStateToProps({product}){
        return{
                product
        }
}
function mapDispatchToProps(dispatch){
        return{
                getProduct:(payload)=>dispatch(productActions.INIT(payload)),
                toggleNav:(payload)=>dispatch(templateActions.NAV({Btn:['Back','Text'],textContent:payload})),
                footer:(payload)=>dispatch(templateActions.FOOTER(payload)),
                openCartInit:()=>dispatch(cartActions.OPENINIT())
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(Product);