import React, {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logOut} from "../store/features/auth/authSlice";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const activeStyles = {
        color: "white"
    }
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler = () => {
        dispatch(logOut)
        window.localStorage.removeItem("token")
        window.location.reload()
    }
    useEffect(() => {
        setIsOpen(false)
    }, [navigate])

    return (
        <div className="flex py-4 justify-between items-center">
            <Link to={"/"}
                className="flex justify-center items-center w-16 h-10 bg-gray-700 text-lg text-white rounded-sm">Logo</Link>
            <div>
                {isAuth &&  <ul className="hidden sm:flex  gap-8">
                    <li>
                        <NavLink to={"/"}
                                 className="text-md transition text-gray-400 hover:text-white"
                                 style={({isActive}) => isActive ? activeStyles : undefined}
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"posts"}
                                 className="text-md transition text-gray-400 hover:text-white"
                                 style={({isActive}) => isActive ? activeStyles : undefined}
                        >
                            Мои посты
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"new"}
                                 className="text-md transition text-gray-400 hover:text-white"
                                 style={({isActive}) => isActive ? activeStyles : undefined}
                        >
                            Создать пост
                        </NavLink>
                    </li>
                </ul>}
            </div>


                {isAuth ?
                    <button
                        onClick={logOutHandler}
                        className="hidden sm:flex transition justify-center items-center bg-gray-700 hover:bg-gray-500 text-md text-white rounded-md py-2 px-4">Выйти
                    </button>
                    :
                   <Link to={"/login"}
                    className="hidden sm:flex transition justify-center items-center bg-gray-700 hover:bg-gray-500 text-md text-white rounded-md py-2 px-4">Войти
                    </Link>
                }
            <button onClick={() => setIsOpen(!isOpen)} className="flex sm:hidden">
                <div className="flex flex-col gap-1.5">
                    <span className={isOpen ? "w-8 h-[3px] transition-all translate-y-1 -rotate-45 rounded-xl bg-gray-400" : "w-8 h-[3px] transition-all rounded-xl bg-gray-400"}></span>
                    <span className={isOpen ? "w-8 h-[3px] transition-all  hidden rounded-xl bg-gray-400" : "w-8 h-[3px] transition-all rounded-xl bg-gray-400"}></span>
                    <span className={isOpen ? "w-8 h-[3px] transition-all -translate-y-1 rotate-45 rounded-xl bg-gray-400" : "w-8 h-[3px] transition-all rounded-xl bg-gray-400"}></span>
                </div>
            </button>


            {isOpen &&
                <div className="bg-[#172235] w-[100vw] h-[40vh] z-40 p-10 flex flex-col justify-center items-center absolute top-20 left-0 ">
                    {isAuth &&  <ul className="flex justify-center text-center flex-col gap-8">
                        <li>
                            <NavLink to={"/"}
                                     className="text-md transition text-gray-400 hover:text-white"
                                     style={({isActive}) => isActive ? activeStyles : undefined}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"posts"}
                                     className="text-md transition text-gray-400 hover:text-white"
                                     style={({isActive}) => isActive ? activeStyles : undefined}
                            >
                                Мои посты
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"new"}
                                     className="text-md transition text-gray-400 hover:text-white"
                                     style={({isActive}) => isActive ? activeStyles : undefined}
                            >
                                Создать пост
                            </NavLink>
                        </li>
                    </ul>}
                    {isAuth ?
                        <button
                            onClick={logOutHandler}
                            className="flex transition justify-center items-center bg-gray-600 mt-8 hover:bg-gray-500 text-md text-white rounded-md py-2 px-4">Выйти
                        </button>
                        :
                        <Link to={"/login"}
                              className="flex transition justify-center items-center bg-gray-700 hover:bg-gray-500 text-md text-white rounded-md py-2 px-4">Войти
                        </Link>
                    }
                </div>
            }
        </div>
    );
};

export default Navbar;