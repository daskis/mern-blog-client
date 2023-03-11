import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import postSlice from "./features/post/postSlice";
import commentsSlice from "./features/comments/commentsSlice";

export const store = configureStore({
    reducer: {
        authSlice: authSlice,
        postSlice: postSlice,
        commentsSlice: commentsSlice
    }
})