import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CartActions from '../action/index';
// import logo from './logo.svg';
import './App.css';
import { Cart }  from '../components/Cart';

const App = ({prodList, actions, isEdit}) => {
    return (
  <div className="app">
    <Cart prodList={prodList}  isEdit={isEdit} actions={actions}/>
  </div>)
}

const mapStateToProps = state => ({
    prodList: state.cart.prodList,
    selectedList: state.cart.selectedList,
    isEdit: state.cart.isEdit
  })

const mapDispathToProps = dispath => ({
  actions: bindActionCreators(CartActions, dispath)
})
export default connect(
  mapStateToProps,
  mapDispathToProps

)(App);
