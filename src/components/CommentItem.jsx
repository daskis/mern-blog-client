import React from 'react';

const CommentItem = ({comment}) => {
    const avatar = comment.comment.trim().toUpperCase().split("").slice(0,2)
    return (
        <div className="flex shrink-0  gap-3 md:gap-6 mt-2">
            <div className="flex items-center justify-center shrink-0 rounded-full h-10 md:w-12 w-10 md:h-12 bg-blue-300 text-md md:text-lg">
                {avatar}
            </div>
            <div className="flex text-gray-300 break-all text-sm md:text-md">{comment.comment}</div>
        </div>
    );
};

export default CommentItem;