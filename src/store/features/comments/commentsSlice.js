import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    comments: [],
    loading: false
}

export const createComment = createAsyncThunk("commentsSlice/createComment", async ({postId, comment}) => {
    try {
        const {data} = await axios.post(`/comments/${postId}`, {
            postId,
            comment
        })
        return data
    } catch (e) {
        console.log(e)
    }
})



export const getPostComments = createAsyncThunk("commentsSlice/getPostComments", async (postId) => {
    try {
        const {data} = await axios.get(`/posts/comments/${postId}`)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const commentsSlice = createSlice({
    initialState,
    name: "commentsSlice",
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createComment.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comments.push(action.payload)
        })
        builder.addCase(createComment.rejected, (state) => {
            state.loading = false;
        })

        // Get comments
        builder.addCase(getPostComments.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getPostComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload
        })
        builder.addCase(getPostComments.rejected, (state) => {
            state.loading = false;
        })
    }
})
export default commentsSlice.reducer