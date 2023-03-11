import React, {useCallback, useEffect, useState} from 'react';
import axios from "../utils/axios";
import PostItem from "../components/PostItem";

const PostsPage = () => {
    const [posts, setPosts] = useState([])
    const fetchMyPosts = useCallback(async () => {
        try {
            const {data} = await axios.get("/posts/user/me")
            setPosts(data)
        } catch (e) {
            console.log(e.message)
        }
    }, [])

    useEffect(() => {
        fetchMyPosts()
    }, [fetchMyPosts])
    return (
        <div className="w-full md:w-2/3 mx-auto py-10 flex flex-col gap-10">
            {posts?.map((post, i) => (
                <PostItem post={post} key={i}/>
            ))}
        </div>
    );
};

export default PostsPage;