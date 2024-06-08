import * as types from "../constants/cart.constants";
import {createSlice} from '@reduxjs/toolkit'


const initialState = {
  cartItemQty:0,
  cartList:[],
  totalPrice:0,
  error:"",
  totalDisPrice:0,
  cartUserInfo:{},
};

const cartSlice=createSlice({
  name:"cart",
  initialState,
  reducers:{
    addToCardRequest(state,action){
      state.loading=true;
    },
    getCartListRequest(state,action){
      state.loading=true;
    },
    deleteCartItemRequest(state,action){
      state.loading=true;
    },
    updateCartItemRequest(state,action){
      state.loading=true;
    },
    getCartQtyRequest(state,action){
      state.loading=true;
    },
    addToCartSuccess(state, action) {
      state.loading = false;
      state.cartItemQty = action.payload;
    
     
      state.totalPrice = state.cartList.reduce(
        (total, item) => (total += item.productId.price * item.qty),
        0
      ).toFixed(2);
    },
    deleteCartItemSuccess(state,action){
      state.loading=false;
      state.cartItemCount=action.payload

    },
    updateCartItemSuccess(state,action){
      state.loading=false;
      state.cartList=action.payload;

    },
    getCartListSuccess(state,action){
      state.loading=false;
      state.cartList=action.payload
      state.totalPrice=action.payload.reduce((total,item)=>(total+=item.productId.price *item.qty),0).toFixed(2)
    },
    getCartUser(state,action){
      state.cartUserInfo = action.payload
    },
    getCartQtySuccess(state,action){
      state.cartItemQty=action.payload;
      
    },
    addToCartFail(state,action){
      state.loading=false;
      state.error=action.payload
    },
    getCartListFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    deleteCartItemFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    updateCartItemFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    getCartQtyFail(state,action){
      state.loading=false;
      state.error=action.payload;
    }
   

  }
})
export const cartActionss=cartSlice.actions
export default cartSlice.reducer;
