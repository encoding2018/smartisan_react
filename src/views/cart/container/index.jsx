import React from 'react';
import {connect} from 'react-redux';
import Main from '../presitational';
import {templateActions} from "../../../store/template";
import {cartActions} from "../../../store/cart";
import {userActions} from "../../../store/user";
import {withRouter} from "react-router-dom";

class Cart extends React.Component{
        constructor(props){
                super(props);
                this.state = {
                        isEdit: false,
                        isSelectAll: false,
                        allPrice: 0,
                        selectNum: 0
                };
                this.changeEdit = this.changeEdit.bind(this);
                this.selectAll = this.selectAll.bind(this);
                this.selectProduct = this.selectProduct.bind(this);
        }

        render(){
                return (
                        <Main {...this.props} {...this.state} {...this}></Main>
                )
        }

        componentDidMount(){
                this.props.toggleNav();
                this.getCartData();
                this.props.getUser();
        }

        getCartData(){
                if(this.props.cart.isInit) return;
                this.props.getCart();
        }

        changeEdit(){
                this.changeState(this.props.select(false));
                this.setState({isEdit: !this.state.isEdit, isSelectAll: false})
        }

        selectProduct(index){
                let {selectNum, allNum, allPrice} = this.props.select(index);
                this.setState({isSelectAll: selectNum === allNum, allPrice, selectNum});
        }

        selectAll(){
                this.changeState(this.props.select(!this.state.isSelectAll));
                this.setState({isSelectAll: !this.state.isSelectAll});
        }

        changeState({allPrice, selectNum}){
                this.setState({allPrice, selectNum});
        }
}

function mapStateToProps({cart, user}){
        return {
                cart,
                user
        }
}

function mapDispatchToProps(dispatch){
        return {
                toggleNav: () => dispatch(templateActions.NAV({Btn: ['Text'], textContent: '购物车'})),
                getCart: () => dispatch(cartActions.INIT()),
                select: (payload) => dispatch(cartActions.SELECT(payload)),
                reduce: (payload) => dispatch(cartActions.REDUCE(payload)),
                add: (payload) => dispatch(cartActions.ADD(payload)),
                remove: (payload) => dispatch(cartActions.REMOVE(payload)),
                getUser: (payload) => dispatch(userActions.GETUSER(payload))
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);