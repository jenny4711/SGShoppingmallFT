import * as types from "../constants/order.constants";
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
orderList:[],
orderNum:"",
selectedOrder:{},
error:"",
loading:false,
totalPageNum:1,

};

const orderSlice = createSlice({
  name:"order",
  initialState,
  reducers:{
    createOrderRequest(state,action){
      state.loading=true;
    },
    getOrderRequest(state,action){
      state.loading=true;
    },
    getOrderListRequest(state,action){
      state.loading=true;
    },
    createOrderSuccess(state,action){
      state.loading=false;
      state.orderNum=action.payload;
    },
    getOrderSuccess(state,action){
      state.loading=false;
      state.orderList=action.payload;
      state.totalPageNum=action.payload;
    },
    getOrderListSuccess(state,action){
      state.loading=false;
      state.orderList=action.payload.data;
      state.totalPageNum=action.payload.totalPageNum;
    },
    AllFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    setSelectedOrder(state,action){
   
      state.selectedOrder=action.payload
      state.totalPageNum=action.payload.totalPageNum;
    }

  }
})
export const orderActionss=orderSlice.actions
export default orderSlice.reducer;