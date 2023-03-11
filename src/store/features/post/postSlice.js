import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false
}

export const getAllPosts = createAsyncThunk(
    "postSlice/getAllPosts",
    async () => {
        try {
            const {data} = await axios.get('/posts')
            return data
        } catch (e) {
            console.log(e.message)
        }
    })

export const createPost = createAsyncThunk("postSlice/createPost", async (params) => {
    try {
        const {data} = await axios.post('/posts', params)
        return data;
    } catch (e) {
        console.log(e.message)
    }
})


export const removePost = createAsyncThunk("postSlice/removePost", async (id) => {
    try {
        const {data} = await axios.delete(`/posts/${id}`, id)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const updatePost = createAsyncThunk("postSlice/updatePost", async (updatedPost) => {
    try {
        const {data} = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create
        builder.addCase(createPost.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts.push(action.payload);
        })
        builder.addCase(createPost.rejected, (state) => {
            state.loading = false;
        })

        // Get all
        builder.addCase(getAllPosts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload.posts;
            state.popularPosts = action.payload.popularPosts;
        })
        builder.addCase(getAllPosts.rejected, (state) => {
            state.loading = false;
        })


        // Remove post
        builder.addCase(removePost.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removePost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = state.posts.filter(post => post?._id !== action?.payload._id);
        })
        builder.addCase(removePost.rejected, (state) => {
            state.loading = false;
        })


        // Update post
        builder.addCase(updatePost.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.posts.findIndex((post) => post._id === action.payload._id)
            state.posts[index] = action.payload
        })
        builder.addCase(updatePost.rejected, (state) => {
            state.loading = false;
        })
    }
})
export default postSlice.reducer
