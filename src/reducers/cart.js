import {CHANGE_EDITOR_STATUS, CHANGE_PROD_NUM, CHECK_PROD, CHECK_ALL, SAVE_PRODS_HISTORY, BACK_PRODS_HISTORY, DELET_PRODS_SELECTED} from '../constants/ActionTypes';
import { cartData }  from '../moco/index';

const initialState = {
  prodList: cartData,
	isEdit: false,
	prodListBack: [],
}
export default function cart (state = initialState, action) {
	switch (action.type) {
		case CHANGE_EDITOR_STATUS:
			return {
				...state,
				isEdit: !state.isEdit
			};
		case CHECK_PROD:
			const { prodList } = state;
      const newProdList =  prodList.map((prod, i) => {
      	if(action.idx === i) {
      		return {
						...prod,
						isChecked: !prod.isChecked
					}
				}else {
      		return prod
				}
			})
			return {
				...state,
        prodList: newProdList
			}
		case DELET_PRODS_SELECTED:
		{
			let prods = state.prodList.map(item => {
				if(item.isChecked) return '';
				return item;
			}).filter(item => item);
			console.log(prods);
      return {
        ...state,
        prodList: prods
      }
		}

		case CHANGE_PROD_NUM:
			//Array.slice() 和解构都是浅拷贝，引用对象依然相互关联，所以要对修改后的对象实现替换。
			const prods = [...state.prodList];
			const preprod = prods[action.idx];
			let newprod;


			switch (action.flag) {
				case 1://+
					newprod = {...preprod, num: preprod.num + 1 }
					break;
				case -1: //-
					newprod = {...preprod, num: preprod.num - 1 }
					break;
				case 2: //input
					newprod = {...preprod, num: parseInt(action.e.target.value, 10)}
					break;
				default:
          newprod = {...preprod}
			}

			prods.splice(action.idx, 1, newprod);
			return {
				...state,
        prodList: prods,
			}
		case CHECK_ALL:
			console.log('CHECK_ALL')
			const prodsSelectAll = state.prodList.map(item => ({...item, isChecked: true}))
			return {
				...state,
				prodList: prodsSelectAll
			}
		case SAVE_PRODS_HISTORY:
			console.log('SAVE_PRODS_HISTORY')
			const prodListBack = state.prodList.map(item => ({...item}))
			return {
				...state,
        prodListBack
			}
		case BACK_PRODS_HISTORY:
			console.log('BACK_PRODS_HISTORY')
			const back = state.prodListBack.map(item => ({...item}));
			return {
				...state,
				prodList: back
			}
		default:
			return state;
	}
}
