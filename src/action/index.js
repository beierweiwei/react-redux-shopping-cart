import * as types from '../constants/ActionTypes';
export const deleteProdsSelected = () => ({type: types.DELET_PRODS_SELECTED});
export const changeEditorStatus = () => ({type: types.CHANGE_EDITOR_STATUS});
export const changeProdNum = (idx, flag, e) => ({type: types.CHANGE_PROD_NUM, idx, flag, e});
export const checkProd = (idx) => ({type: types.CHECK_PROD, idx});
export const checkAll = () => ({type: types.CHECK_ALL});
export const cancelEditor = () => ({type: types.CANCEL_EDITOR});
export const saveProdsHistory = () => ({type: types.SAVE_PRODS_HISTORY});
export const backProdsHistory = () => ({type: types.BACK_PRODS_HISTORY})