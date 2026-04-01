'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/context/PostContext';
import { renderContentWithLinks } from '@/lib/content-renderer';
import { ArrowUp, ArrowDown, MessageSquare, Share2 } from 'lucide-react';
import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const { deletePost } = usePosts();
  const initialVoteCount = parseInt(post.id) * 10 + 50; // Example deterministic value
  const [voteCount, setVoteCount] = React.useState(initialVoteCount);

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 p-4 rounded-xl shadow-lg mb-4 flex gap-4">
      <div className="flex flex-col items-center text-gray-700 dark:text-gray-300 pt-2">
        <button className="hover:text-indigo-500"><ArrowUp size={20} /></button>
        <span className="text-sm font-bold my-1">{voteCount}</span>
        <button className="hover:text-red-500"><ArrowDown size={20} /></button>
      </div>
      <div className="flex-grow">
        <div className="flex items-center mb-2">
          <img src={post.authorImageUrl} alt={post.author} className="w-8 h-8 rounded-full mr-3 border-2 border-white/50" />
          <div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">{post.author}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <Link href={`/community/post/${post.id}`} className="cursor-pointer">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:underline">{post.title}</h2>
        </Link>
        <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">{renderContentWithLinks(post.content)}</p>
        {post.linkUrl && (
          <div className="border dark:border-gray-700 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-900/30">
            <a href={post.linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-semibold">
              {post.linkUrl}
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Link preview description would go here...</p>
          </div>
        )}
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-center gap-4">
            <button onClick={() => router.push(`/community/post/${post.id}#comments`)} className="flex items-center gap-1 hover:text-indigo-500 cursor-pointer">
                <MessageSquare size={16} />
                <span>{post.comments.length} Comments</span>
            </button>
            <button className="flex items-center gap-1 hover:text-indigo-500">
                <Share2 size={16} />
                <span>Share</span>
            </button>
            <button onClick={() => deletePost(post.id)} className="text-red-500 hover:underline ml-auto">Delete</button>
            <button className="text-red-500 hover:underline">Report</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
