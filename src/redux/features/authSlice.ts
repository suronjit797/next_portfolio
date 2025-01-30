import { User } from "@/global/interface";
import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  token: string;
  isLogin: boolean;
  user: User | null;
}

const initialState: IState = {
  token: "",
  isLogin: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, { payload }) => {
      state.token = payload.token;
      state.isLogin = Boolean(payload.token);
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setAuthToken, setUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
