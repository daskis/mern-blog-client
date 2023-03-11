import React from 'react';
import {AiFillEye, AiFillMessage} from "react-icons/ai"
import Moment from "react-moment";
import {Link} from "react-router-dom";

const PostItem = ({post}) => {
    if (!post) {
        return (
            <div className="text-xl text-center text-white py-10">
                Постов нет, создайте новые
            </div>
        )
    }
    return (
       <Link to={`/${post._id}`}>
           <div className="flex flex-col basis-2/3 flex-grow ">
               <div className={
                   post.imgUrl ? " flex" : "flex "
               }>
                   {post.imgUrl
                       ?
                       <img src={`http://localhost:3001/${post.imgUrl}`} className="object-cover" alt="postImg"/>
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
               <p className="text-white opacity-50 mt-2 text-sm line-clamp-4">{post.text}</p>
               <div className="flex items-center gap-3">
                   <button className="flex items-center gap-2 text-sm text-white opacity-50">
                       <AiFillEye/> <span>{post.views}</span>
                   </button>

                   <button className="flex items-center gap-2 text-sm text-white opacity-50">
                       <AiFillMessage/> <span>{post.comments?.length}</span>
                   </button>
               </div>
           </div>
       </Link>
)
    ;
};

export default PostItem;