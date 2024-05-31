import * as types from "../constants/user.constants";
import {createSlice} from '@reduxjs/toolkit'
const initialState = {
  user: null,
  loading: false,
  error: "",
};


const userSlice=createSlice({
  name:"user",
  initialState,
  reducers:{
    registerUserRequest(state,action){
     state.loading= true;
     state.user= null;
     state.error= "" ;

    },
    loginRequest(state,action){
      state.loading = true;
      state.user = null;
      state.error = "";
    },
    googleLoginRequest(state,action){
      state.loading = true;
      state.user = null;
      state.error = "";
    },
    googleLoginSuccess(state,action){
      state.loading = false;
      state.user = action.payload.user;
      state.error = "";

    },
    loginSuccess(state,action){
      state.loading=false;
      state.user=action.payload.user;
      state.error="";
    },
    registerUserSuccess(state,action){
      state.loading=false;
    },
    registerUserFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    googleLoginFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    loginFail(state,action){
      state.loading=false;
      state.error=action.payload;
    },
    loginTokenRequest(state,action){
       state.loading = true;
    },
    loginTokenSuccess(state,action){
      state.loading=false;
      state.user=action.payload.user;
      state.error="";

    },
    loginWithTokenFail(state,action){
      state.loading=false;
      state.error=action.payload;

    },
    logout(){
      return{
        user:null,
        loading:false,
        error:""
      }
    }

  }
})

export const userActionss=userSlice.actions
export default userSlice.reducer