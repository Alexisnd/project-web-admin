import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

const initialUser = () => {
  const item = getCookie("user")?.toString();
  return item
    ? JSON.parse(item)
    : null;
};

const initialIsAuth = () => {
    const item = getCookie("isAuth")?.toString();
    return item ?? false;
};

const initialToken = () => {
  const item = getCookie("token")?.toString();
  return item ?? null;
};

export const authStore = createSlice({
  name: "auth",
  initialState: {
    user: initialUser(),
    isAuth: initialIsAuth(),
    token: initialToken(),
  },
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;      
      setCookie("token", state.token);
      const decodeToken: any = jwtDecode(String(state.token));
      const user = {id: decodeToken.id, name: decodeToken.name, profile: decodeToken.profile_id, email: decodeToken.email}
      state.user = user;
      setCookie("user", JSON.stringify(state.user));
      state.isAuth = !!user;
      setCookie("isAuth", state.isAuth);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuth = false;
      deleteCookie("user");
      deleteCookie("isAuth");
      deleteCookie("token");
    },
  },
});

export const { login, logout } = authStore.actions;

export default authStore.reducer;
