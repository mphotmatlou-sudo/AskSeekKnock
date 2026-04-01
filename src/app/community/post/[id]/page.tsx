'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import PostCard from '@/components/community/post-card';
import CommentCard from '@/components/community/comment-card';
import CommentForm from '@/components/community/comment-form';
import { Comment } from '@/lib/types';
import { usePosts } from '@/context/PostContext';

// Add parentId for threading
interface ThreadedComment extends Comment {
  parentId?: string;
  replies?: ThreadedComment[];
}

const CommentThread = ({ comments }: { comments: ThreadedComment[] }) => {
    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id}>
                    <CommentCard comment={comment} />
                    {comment.replies && (
                        <div className="ml-6 lg:ml-10 mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                            <CommentThread comments={comment.replies} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

const PostPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { posts } = usePosts();
  const post = posts.find(p => p.id === params.id);

  console.log(`PostPage rendered for Post ID: ${params.id}`);

  if (!post) {
    return (
      <div className="container mx-auto p-4">
        <button onClick={() => router.back()} className="mb-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 h-10 px-4 py-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Feed
        </button>
        <h1 className="text-3xl font-bold">Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 h-10 px-4 py-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Feed
      </button>
      <PostCard post={post} />
      <div className="mt-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Comments ({post.comments.length})</h2>
        <CommentForm postId={params.id} />
        <div className="mt-6">
          <CommentThread comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
