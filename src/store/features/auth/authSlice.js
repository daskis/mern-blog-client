import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

export const registerUser = createAsyncThunk("authSlice/registerUser", async ({username, password}) => {
    try {
        const {data} = await axios.post("/auth/register", {username, password})
        if (data.token) {
            window.localStorage.setItem("token", data.token)
        }
        return data
    } catch (e) {

    }
})
export const loginUser = createAsyncThunk("authSlice/loginUser", async ({username, password}) => {
    try {
        const {data} = await axios.post("/auth/login", {username, password})
        if (data.token) {
            window.localStorage.setItem("token", data.token)
        }
        return data
    } catch (e) {

    }
})

export const getMe = createAsyncThunk("authSlice/getMe", async () => {
    try {
        const {data} = await axios.get("/auth/me")
        return data
    } catch (e) {
        console.log(e)
    }
})


export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: (builder) => {
        // REGISTER
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        })

        // LOGIN
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        })

        // GET ME
        builder.addCase(getMe.pending, (state, action) => {
            state.isLoading = true
            state.status = null
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        })
    }
})
export const checkIsAuth = (state) => Boolean(state.authSlice.token)
export const {logOut} = authSlice.actions
export default authSlice.reducer