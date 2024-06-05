
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
  productList: [],
  selectedProduct: null,
  loading: false,
  error: "",
  totalPageNum:1,
  detailProduct:null,
  byCategory :[],
  productAll:null,
};

const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
    productCreateRequest(state,action){
      state.loading=true;
    },
    productGetRequest(state,action){
      state.loading=true;
    },
    productEditRequest(state,action){
      state.loading=true;
    },
    productCreateSuccess(state,action){
      state.loading=false;
      state.error="";
    },
    productEditSuccess(state,action){
      state.loading=false;
      state.error="";
    },
    productGetSuccess(state,action){
      state.loading=false;
      state.error="";
      state.productList=action.payload;
      
    },
    productGetByCategorySuccess(state,action){
      state.loading=false;
      state.byCategory=action.payload.data
    },
    productCreateFail(state,action){
      state.loading=false;
      state.error=action.payload;

    },
    productGetFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    productEditFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    setSelectedProduct(state,action){
      state.selectedProduct=action.payload
    },
    productDetail(state,action){
      state.loading=false;
      state.error="";
      state.productDetail=action.payload;
    },
    productTotal(state,action){
      state.productAll=action.payload
      state.totalPageNum=action.payload.totalPageNum
    }
  

  }
})




export const productActions=productSlice.actions
export default productSlice.reducer;
