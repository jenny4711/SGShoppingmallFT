import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";
import { productActions as productActionss } from "../reducer/productReducer";
const getProductList = () => async (dispatch) => {
  try {
    dispatch(productActionss.productGetRequest());
    const response = await api.get("/product", );

    if (response.status !== 200) throw new Error(response.error);
    console.log(response.data.products,'actionData!!!')
    dispatch(productActionss.productGetSuccess(response.data.products));
  } catch (error) {
    dispatch(productActionss.productGetFail(error.error));

    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};




const getProductDetail = (id) => async (dispatch) => {};

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
const deleteProduct = (id) => async (dispatch) => {};

const editProduct = (formData, id) => async (dispatch) => {};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
