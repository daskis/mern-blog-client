import React, {useEffect} from 'react';
import PostItem from "../components/PostItem";
import PopularPosts from "../components/PopularPosts";
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../store/features/post/postSlice";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {posts, popularPosts} = useSelector(state => state.postSlice)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [navigate, dispatch])
    if (!posts) {
        return (
            <div>Постов нет</div>
        )
    }
    return (
        <div className="max-w-[98%] md:max-w-[80%] mx-auto py-10">
            {posts.length ?
                <div className="flex justify-between flex-col-reverse xs:flex-row gap-10 md:gap-24">
                    <div className="flex flex-col gap-14 basis-4/5">
                        {posts?.map((post, i) => (
                            <PostItem key={i} post={post}/>
                        ))}
                    </div>
                    <div className="basis-1/3">
                        <div className="text-md text-white">Популярное:</div>
                        {popularPosts?.map((post, i) => (
                            <PopularPosts key={i} post={post}/>
                        ))}
                    </div>
                </div>
            :
            <div className="text-2xl text-center font-bold text-gray-300">Постов нет, добавьте первый</div>
            }

        </div>
    );
};

export default MainPage;