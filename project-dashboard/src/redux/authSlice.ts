import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  role: "Admin" | "ProjectManager" | "Developer" | null;
  name: string | null;
};

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  name: typeof window !== "undefined" ? localStorage.getItem("username") : null,
  role: typeof window !== "undefined" ? (localStorage.getItem("role") as AuthState["role"] | null) : null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;

      localStorage.setItem("token", action.payload.token || "");
      localStorage.setItem("role", action.payload.role || "");
      localStorage.setItem("name", action.payload.name || "");
    },
    logout: (state) => {
    state.token = null;
    state.role = null;
    state.name = null;

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
},
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
