import React from 'react';
import { Comment } from '@/lib/types';

interface CommentProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mt-2">
      <div className="flex items-center mb-2">
        <img src={comment.authorImageUrl} alt={comment.author} className="w-6 h-6 rounded-full mr-2" />
        <span className="font-semibold">{comment.author}</span>
      </div>
      <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
      <div className="text-xs text-gray-500 mt-1 flex justify-between">
        {new Date(comment.createdAt).toLocaleDateString()}
        <button className="text-red-500 hover:underline">Report</button>
      </div>
    </div>
  );
};

export default CommentCard;
