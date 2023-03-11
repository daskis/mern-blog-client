import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, registerUser} from "../store/features/auth/authSlice";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const {status} = useSelector(state => state.authSlice)
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()
    useEffect(() => {
        if (status) {
            toast(status)
        }

    }, [status, navigate])
    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            dispatch(registerUser({username, password}))
            setPassword("")
            setUsername("")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {isAuth
                ?
            <div className="text-2xl text-white text-center mt-8">Вы уже авторизированы</div>

            :
                <form onSubmit={e => e.preventDefault()}
                      className="w-full xs:w-2/3 md:w-1/3 h-60 mx-auto mt-[14vh] flex flex-col gap-8">
                    <h1 className="text-2xl text-gray-100 text-center">Регистрация</h1>
                    <div className="relative">
                        <input type="text" id="floating_filled__first"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-lg text-gray-900 bg-gray-50 dark:bg-gray-400 border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "/>
                        <label htmlFor="floating_filled__first"
                               className="absolute text-lg text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-gray-800 peer-focus:dark:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Логин</label>
                    </div>
                    <div className="relative">
                        <input type="password" id="floating_filled__second"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-lg text-gray-900 bg-gray-50 dark:bg-gray-400 border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "/>
                        <label htmlFor="floating_filled__second"
                               className="absolute text-lg text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-gray-800 peer-focus:dark:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Пароль</label>
                    </div>



                    <div className="flex flex-col gap-4 justify-center">
                        <button
                            onClick={handleSubmit}
                            className="flex justify-center items-center text-lg dark:hover:bg-gray-600 transition-all text-white bg-gray-700 rounded-lg py-4 ">Зарегистрироваться</button>
                        <Link
                            className={"flex justify-center items-center text-white text-md"}
                            to={"/login"}>
                            Уже есть аккаунт?
                        </Link>
                    </div>

                </form>
            }
        </>
    );
};

export default LoginPage;