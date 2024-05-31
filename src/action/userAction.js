import api from "../utils/api";
import { userActionss } from "../reducer/userReducer";
import { commonUiActions } from "./commonUiAction";


const loginWithToken = () => async (dispatch) => {};
const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(userActionss.loginRequest());
      sessionStorage.removeItem("token");
      const response = await api.post(`/auth/login`, { email, password });
     
      if (response.status !== 200) throw new Error(response.error);
      sessionStorage.setItem("token", response.data.data.token);

      dispatch(userActionss.loginSuccess(response.data.data));
      dispatch(
        commonUiActions.showToastMessage("로그인을 성공 했습니다!", "success")
      );
      
    } catch (error) {
      dispatch(userActionss.loginFail(error.message));
      dispatch(commonUiActions.showToastMessage(error.message, "error"));
    }
  };
const logout = () => async (dispatch) => {};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
  ({ name,email,password }, navigate) =>
  async (dispatch) => {
    try {
     
      dispatch(userActionss.registerUserRequest());
      const response = await api.post("/user", {
        name,
        email,
        password
      });

      if (response.status !== 200) throw new Error(response.error);

      dispatch(userActionss.registerUserSuccess());
      dispatch(
        commonUiActions.showToastMessage("회원가입을 완료 했습니다!", "success")
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
      dispatch(userActionss.registerUserFail(error.error));
    }
  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
