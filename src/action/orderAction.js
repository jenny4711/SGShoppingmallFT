import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";
import { orderActionss } from "../reducer/orderReducer";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    console.log(payload,'payload')
    dispatch(orderActionss.createOrderRequest());
    const response = await api.post("/order", payload);
    if (response.status !== 200) throw new Error(response.error);
    dispatch(orderActionss.createOrderSuccess(response.data));
    dispatch(cartActions.getCartQty());
    navigate("/payment/success");
  } catch (error) {
    dispatch(orderActionss.AllFail(error.error));
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch(orderActionss.getOrderRequest());
    const res = await api.get("/order");
    if (res.status !== 200) throw new Error(res.error);
    dispatch(orderActionss.getOrderSuccess(res.data.data));
  } catch (error) {
    dispatch(orderActionss.AllFail(error.error));
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};
const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch(orderActionss.getOrderListRequest());

    const res = await api.get("/order/all", { params: { ...query } });

    if (res.status !== 200) throw new Error(res.error);
    dispatch(orderActionss.getOrderListSuccess(res.data));
  } catch (error) {
    dispatch(orderActionss.AllFail(error.error));
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch(orderActionss.createOrderRequest());
    const res = await api.put(`/order/${id}`, { status });
    if (res.status !== 200) throw new Error(res.error);

    dispatch(orderActionss.setSelectedOrder(res.data));
    dispatch(commonUiActions.showToastMessage("오더가 수정되었습니다.", "success"));

  } catch (error) {
    dispatch(orderActionss.AllFail(error.error));
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
