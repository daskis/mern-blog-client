import Layout from "./components/Layout";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AddPostPage from "./pages/AddPostPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import {ToastContainer} from "react-toastify";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getMe} from "./store/features/auth/authSlice";
import EditPostPage from "./pages/EditPostPage";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])
  return (
      <div className="relative">
          <Layout>
              <Routes>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/posts" element={<PostsPage/>}/>
                  <Route path="/:id" element={<PostPage/>}/>
                  <Route path="/new" element={<AddPostPage/>}/>
                  <Route path=":id/edit" element={<EditPostPage/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>

              </Routes>
              <ToastContainer position="bottom-right"/>
          </Layout>
      </div>

  );
}

export default App;
