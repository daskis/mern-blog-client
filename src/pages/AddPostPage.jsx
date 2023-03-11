import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {createPost} from "../store/features/post/postSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const AddPostPage = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const uploadFile = (e) => {
        let file = e.target.files[0];
        setImage(file)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        try {
            const data = new FormData(e.target)
            console.log(image)
            dispatch(createPost(data))
            toast("Пост создан")
            navigate('/')
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    const clearNewPost = () => {
        setTitle("")
        setText("")
        setImage(null);
    }
    return (
        <div>
            <form
                onSubmit={submitHandler}
                className="w-full xs:w-2/3 lg:w-[40%] mx-auto py-10 flex flex-col gap-4 md:gap-8"
            >
                <label
                    className="text-gray-300 py-2 bg-gray-600 text-md mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
                    Прикрепить изображение
                    <input
                        name="image"
                        onChange={uploadFile}
                        type="file"
                        className="hidden"/>

                </label>
                {image &&
                    <div className="flex object-cover border-2 border-white py-2">
                        {image && <img src={URL.createObjectURL(image)} alt="postImage"/>}
                    </div>
                }
                <div className="relative">
                    <input type="text" id="floating_filled"
                           name="title"
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                           className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-lg text-gray-900 bg-gray-50 dark:bg-gray-400 border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" "/>
                    <label htmlFor="floating_filled"
                           className="cursor-text absolute text-lg text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Заголовок
                        поста</label>
                </div>
                <div className="relative">
                    <textarea id="floating_filled"
                              name="text"
                              value={text}
                              onChange={e => setText(e.target.value)}
                              className="block rounded-lg h-40 px-2.5 pb-2.5 pt-5 w-full text-lg text-gray-900 bg-gray-50 dark:bg-gray-400 border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "/>
                    <label htmlFor="floating_filled"
                           className="cursor-text absolute text-lg text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Текст
                        поста</label>
                </div>


                <div className="flex gap-8 items-center justify-center mt-4">
                    <button
                        type="submit"
                        className="flex justify-center items-center bg-gray-700 dark:hover:bg-gray-600 transition-all text-md text-white rounded-sm py-2 px-4">
                        Добавить пост
                    </button>
                    <button
                        onClick={clearNewPost}
                        type="button"
                        className="flex justify-center items-center bg-red-600 dark:hover:bg-red-500 transition-all text-md text-white rounded-sm py-2 px-4">
                        Отменить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPostPage;