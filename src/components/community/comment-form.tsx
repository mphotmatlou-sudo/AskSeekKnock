'use client';

import React, { useState } from 'react';
import { usePosts } from '@/context/PostContext';

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const { addComment } = usePosts();
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      addComment(postId, commentContent);
      setCommentContent(''); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        rows={3}
        placeholder="Add a comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      ></textarea>
      <button type="submit" className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
    </form>
  );
};

export default CommentForm;
