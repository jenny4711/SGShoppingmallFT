import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";
import { productActions as productActionss } from "../reducer/productReducer";
const getProductList = (query) => async (dispatch) => {
  try {
    dispatch(productActionss.productGetRequest());
    const response = await api.get("/product",{params:{...query}} );

    if (response.status !== 200) throw new Error(response.error);
    console.log(response.data.data,'resData')
  
    dispatch(productActionss.productTotal(response.data));
    dispatch(productActionss.productGetSuccess(response.data.data));
  } catch (error) {
    dispatch(productActionss.productGetFail(error.error));

    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};




const getProductDetail = (id) => async (dispatch) => {
  try{
    dispatch(productActionss.productGetRequest());
    const response = await api.get(`/product/${id}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch(productActionss.productDetail(response.data.product));
   
  }catch(error){
    dispatch(productActionss.productGetFail(error.error));
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const createProduct = (formData) => async (dispatch) => {
  try {
    console.log(formData,'formDataAction!!!')
    dispatch(productActionss.productCreateRequest());

    const response = await api.post("/product", formData);
    if (response.status !== 200) throw new Error(response.error);
console.log(response.data,'resData')
    dispatch(productActionss.productCreateSuccess());
    dispatch(commonUiActions.showToastMessage("상품생성 완료", "success"));
  
  } catch (error) {
    console.log(error,'error!!!!!!!!')
    dispatch(productActionss.productCreateFail(error));
    dispatch(commonUiActions.showToastMessage("상품생성 정보를 확인후 다시 시도해주세요!", "error"));
  }
};
const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(productActionss.productEditRequest());
   
    const res = await api.put(`/product/isDeleted/${id}`);
    if (res.status !== 200) throw new Error(res.error);
    console.log(res,'resDelete!!!!!!')
    dispatch(productActionss.productEditSuccess(res.data));
    dispatch(commonUiActions.showToastMessage("상품 삭제 완료", "success"));
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (error) {
    dispatch(productActionss.productGetFail(error.error));
    dispatch(commonUiActions.showToastMessage("업데이트를 다시 시도해주세요.", "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch(productActionss.productEditRequest());
console.log(id,'id')
    const response = await api.put(`/product/${id}`, formData);
    if (response.status !== 200) throw new Error(response.error);

    dispatch(productActionss.productEditSuccess(response.data.data));
    dispatch(commonUiActions.showToastMessage("상품 수정 완료", "success"));

    dispatch(getProductList({ page: 1, name: "" }));
  } catch (error) {
    dispatch(productActionss.productGetFail(error.error));
    dispatch(commonUiActions.showToastMessage("상품수정 다시 시도해주시기 바랍니다. ", "error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
