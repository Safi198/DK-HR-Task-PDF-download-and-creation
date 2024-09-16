import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

//API URL
const signupUrl = "http://localhost:8080/api/signup";
const loginUrl = "http://localhost:8080/api/login";
const logoutUrl = "http://localhost:8080/api/logout";
const forgotPasswordUrl = "http://localhost:8080/api/forgotPassword";
const resetPasswordUrl = "http://localhost:8080/api/resetPassword";
const validateTokenUrl = "http://localhost:8080/api/validateToken";
const approveUserUrl = "http://localhost:8080/api/approveUser";
const rejectUserUrl = "http://localhost:8080/api/rejectUser";

//CREATE ASYNC THUNK
export const createuserAsync = createAsyncThunk(
    "user/create",
    async (formData) => {
        try {
            const response = await axios.post(signupUrl, formData);
            console.log("form", formData);
            console.log(response.data);
            //toast.success(response.data.msg);
            return response.data;
        } catch (error) {
            // toast.error(error.response.data.msg);
            // console.log(error.response.data.msg);
            console.log(error);
        }
    }
);

// lOGIN ASYNC THUNK
export const loginuserAsync = createAsyncThunk(
    "user/login",
    async (logData) => {
        try {
            const response = await axios.post(loginUrl, logData);
            const token = response.data.accessToken;
            const user = response.data.userData;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user)); // Save user data

            console.log("User logged in:", response.data);
            return response;
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
);

// lOGOUT ASYNC THUNK
export const logoutuserAsync = createAsyncThunk("user/logout", async () => {
    try {
        const response = await axios.post(logoutUrl);
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // Clear user data

        console.log("User logged out:", response.data);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.msg);
    }
});

// FORGET ASYNC THUNK
export const forgetuserAsync = createAsyncThunk(
    "user/forget",
    async (email) => {
        try {
            const response = await axios.post(forgotPasswordUrl, email);
            // console.log(response.data);
            toast.success(response.data.msg);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
);

// RESET PASSWORD ASYNC THUNK
export const resetpasswordAsync = createAsyncThunk(
    "user/resetPassword",
    async (newPassword, confirmPassword, resetToken) => {
        try {
            const response = await axios.post(
                resetPasswordUrl,
                newPassword,
                confirmPassword,
                resetToken
            );
            //toast.success(response.data.msg)
            toast.success("Password Reset Successfully");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("ok reset done");
            console.log(error.response.message);
        }
    }
);

// INITIAL STATE
const initialState = {
    createUser: null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    logoutUser: null,
    clearUser: null,
    forgetPasswordEmail: null,
    resetPassword: null,
    validateToken: null,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token"); // Clear token on logout
        },
    },
    extraReducers: (builder) => {
        builder

            // createuserAsync
            .addCase(createuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.createUser = action.payload;
            })

            // loginuserAsync
            .addCase(loginuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.userData;
                state.isAuthenticated = true;
            })

            // logoutuserAsync
            .addCase(logoutuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logoutuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // forgetuserAsync
            .addCase(forgetuserAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(forgetuserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.forgetPasswordEmail = action.payload;
                state.forgetPasswordEmail = null;
            })

            // resetpasswordAsync
            .addCase(resetpasswordAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(resetpasswordAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.resetPassword = action.payload;
            });
    },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
