import React from 'react';
class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.changeEditStatus = this.changeEditStatus.bind(this);
	}
	//计算商品总价、数量
	countCart(){
		if(this.props.isEdit) return [0, 0];
		const prods = this.props.prodList;
		if(prods.length === 0) return [0, 0];
		var i = 0, len = prods.length, countTemp, allMoney = 0, allNum = 0;
		for(i; i < len; i++) {
			countTemp = prods[i].price * prods[i].num;
			allMoney = Number(countTemp) + Number(allMoney);
			allNum = Number(prods[i].num) + Number(allNum);
		}
		return [allMoney, allNum];
	}
	isSelectAll() {
		const prodList = this.props.prodList;
		return prodList.filter(item => item.isChecked === true).length === prodList.length;
	}
	changeEditStatus() {
		if(!this.props.isEdit){this.props.actions.saveProdsHistory();}
  	this.props.actions.changeEditorStatus();
	}

	render() {
		const countCart = this.countCart();
		const isSelectAll = this.isSelectAll();
		return (
			<div className="cart-container">
				<div className="top-tool">
					<span>购物车</span>
					<div onClick={this.changeEditStatus}>
						{this.props.isEdit ?
							( <div>
								<div>完成</div>
							 <div onClick={this.props.actions.backProdsHistory}>取消</div></div>)
							:
							(<div>编辑</div>)
						}
					</div>
				</div>
				<CartProds 
					prods={this.props.prodList}
					isEdit = {this.props.isEdit}
					onCheck={this.props.actions.checkProd}
					onNumChange={this.props.actions.changeProdNum}
				>
				</CartProds>

				<CountAll
					allMoney={countCart[0]}
					allNum={countCart[1]}
					isSelectAll={isSelectAll}
					isEdit={this.props.isEdit}
					handleCheckAll={this.props.actions.checkAll}
					deleteProdsSelected={this.props.actions.deleteProdsSelected}
					gopay={this.gopay}
				>
				</CountAll>
			</div>
		)
	};
}

function CartProds(props) {

	let ui = props.prods.map((item, idx) => {
			return (
				<li key={idx}>
					<span >
						<input type="checkbox" checked={item.isChecked}  onChange={() => props.onCheck(idx)}/>
						<label >点我</label>
					</span>

					<img src={item.imgUrl} alt=""/>
					<span>{item.title}</span>
					<span>价格：{item.price}</span>
					<ChangeProdNum
						onNumChange={props.onNumChange}
						id={idx}
						value={item.num}
						isEdit={props.isEdit}
					>
					</ChangeProdNum>
				</li>
			)
		})
		return (
			<ul>{ui}</ul>
		)
}

function ChangeProdNum(props) {
	return(
		<div>
			{props.isEdit && (<span onClick={(e) => {props.onNumChange(props.id, 1)}}> + </span>)}
			<input type="number" disabled={!props.isEdit} value={props.value} onChange={(e) => {props.onNumChange(props.id,2, e)}} />
			{props.isEdit && (<span onClick={(e) => {props.onNumChange(props.id, -1)}}> - </span>)}
		</div>
	)
}

function CountAll(props) {

	const allSelectStyle = props.isSelectAll ? {color: '#f60'} : {};
	var actionUi;
	if(props.isEdit) {
		actionUi = (<span onClick={props.deleteProdsSelected}>删除所选</span>)
	}else{
		actionUi = (<span onClick={props.goPay}>去支付</span>)
	}
	return (
		<div>
			<span>总价：{props.allMoney}; 总数： {props.allNum}</span><span onClick={props.handleCheckAll} style={allSelectStyle}>全选</span>{actionUi}
		</div>
	)
}

export {
	Cart,
	CartProds,
	ChangeProdNum,
} 
