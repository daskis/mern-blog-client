import React, {useCallback, useEffect, useState} from 'react';
import Moment from "react-moment";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {AiFillEye, AiFillMessage, AiTwotoneEdit, AiFillDelete} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {removePost} from "../store/features/post/postSlice";
import {toast} from "react-toastify";
import {createComment, getPostComments} from "../store/features/comments/commentsSlice";
import CommentItem from "../components/CommentItem";

const PostPage = () => {
        const [post, setPost] = useState(null)
        const [comment, setComment] = useState("")
        const {comments} = useSelector(state => state.commentsSlice)
        const {user} = useSelector(state => state.authSlice)
        const dispatch = useDispatch()
        const params = useParams()
        const navigate = useNavigate()
        console.log(comments)

        const fetchPost = useCallback(async () => {
            const {data} = await axios.get(`/posts/${params.id}`)
            setPost(data)
        }, [params.id])
        const removePostHandler = () => {
            if (params.id) {
                try {
                    dispatch(removePost(params.id))
                    toast("Пост удален")
                    navigate("/")
                    window.location.reload()
                } catch (e) {
                    console.log(e.message)
                }
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const username = user.username
                const postId = params.id
                dispatch(createComment({postId, comment, username}))
                setComment("")
            } catch (e) {
                console.log(e)
            }
        }

        const fetchComments = useCallback(async () => {
            try {
                dispatch(getPostComments(params.id))
            } catch (e) {
                console.log(e)
            }
        }, [dispatch, params.id])

        useEffect(() => {
            fetchPost()
        }, [fetchPost])
        useEffect(() => {
            fetchComments()
        }, [fetchComments])


        if (!post) {
            return (
                <div className="text-xl text-center text-white py-10">
                    Пост не найден
                </div>
            )
        }
        return (
            <div className="w-[95%] mx-auto">
                <div className="flex flex-col sm:flex-row gap-10 py-8">
                    <div className="w-full sm:w-2/3">
                        <div className="flex flex-col basis-1/4 flex-grow">
                            <div className={
                                post.imgUrl ? "rounded-3xl flex" : "flex rounded-3xl"
                            }>
                                {post.imgUrl
                                    ?
                                    <img src={`http://localhost:3001/${post.imgUrl}`} className="object-cover"
                                         alt="postImg"/>
                                    :
                                    <img
                                        className=""
                                        src="https://www.digitary.net/wp-content/uploads/2022/08/placeholder.png" alt=""/>
                                }
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <p className="text-white text-sm opacity-40">{post.username}</p>
                                <p className="text-white text-sm opacity-40">
                                    <Moment date={post.createdAt} format="D MMM YYYY"/>
                                </p>
                            </div>
                            <h3 className="text-white text-lg">{post.title}</h3>
                            <p className="text-white opacity-50 mt-2 text-sm">{post.text}</p>
                            <div className="flex items-center justify-between gap-2 mt-2">
                                <div className="flex gap-3 mt-4">
                                    <button className="flex items-center gap-2 text-sm text-white opacity-50">
                                        <AiFillEye/> <span>{post.views}</span>
                                    </button>

                                    <button className="flex items-center gap-2 text-sm text-white opacity-50">
                                        <AiFillMessage/> <span>{post.comments?.length}</span>
                                    </button>
                                </div>
                                {user?._id === post.author &&
                                    <div className="flex gap-3 mt-4">
                                        <Link to={`/${params.id}/edit`}
                                              className="flex items-center gap-2 text-xl text-white opacity-50">
                                            <AiTwotoneEdit/>
                                        </Link>

                                        <button
                                            onClick={removePostHandler}
                                            className="flex items-center gap-2 text-xl text-white opacity-50">
                                            <AiFillDelete/>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3 p-4 bg-gray-700 flex  flex-col gap-2 rounded-sm">
                        <form className="flex flex-col gap-2 w-full">
                            <div className="relative">
                                <textarea  id="floating_filled__second"
                                       value={comment}
                                       onChange={(e) => setComment(e.target.value)}
                                       className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-lg text-gray-900 bg-gray-50 dark:bg-gray-400 border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "/>
                                <label htmlFor="floating_filled__second"
                                       className="absolute text-sm md:text-lg text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-gray-800 peer-focus:dark:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Ваш комментарий</label>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="flex justify-center text-white rounded-lg items-center bg-gray-600 text-md py-2 px-4"
                                type="submit">Отправить
                            </button>
                        </form>


                        {comments.map((comment, id) => (
                            <CommentItem key={id} comment={comment}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
;

export default PostPage;