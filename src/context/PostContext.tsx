'use client';

import React, { createContext, useContext, useState } from 'react';
import { Post } from '@/lib/types';

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'John Doe',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    title: 'First Post',
    content: 'This is the first post in the community feed.',
    linkUrl: 'https://example.com',
    category: 'General Discussion',
    createdAt: Date.now(),
    comments: [],
  },
  {
    id: '2',
    author: 'Jane Smith',
    authorImageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    title: 'Second Post',
    content: 'This is the second post, with some interesting thoughts on scripture.',
    category: 'Scripture',
    createdAt: Date.now() - 86400000, // 1 day ago
    comments: [
      { id: 'c1', author: 'Admin', authorImageUrl: '', content: 'Great thoughts!', createdAt: Date.now() },
    ],
  },
  {
    id: '3',
    author: 'Chris Green',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    title: 'Feeling Grateful',
    content: 'Just wanted to share how #blessed I feel today. Thanks to @Jane Smith for the encouragement!',
    category: 'General Discussion',
    createdAt: Date.now() - 172800000, // 2 days ago
    comments: [],
  },
];

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'author' | 'authorImageUrl' | 'comments'>) => void;
  addComment: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'author' | 'authorImageUrl' | 'comments'>) => {
    const newPost: Post = {
      ...post,
      id: (posts.length + 1).toString(),
      createdAt: Date.now(),
      author: 'Current User', // Mock current user
      authorImageUrl: 'https://randomuser.me/api/portraits/men/0.jpg',
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const addComment = (postId: string, content: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `c${post.comments.length + 1}`,
            author: 'Current User', // Mock current user
            authorImageUrl: 'https://randomuser.me/api/portraits/men/0.jpg',
            content,
            createdAt: Date.now(),
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  };

  const deletePost = (postId: string) => {
    console.log('Attempting to delete post with ID:', postId);
    setPosts(prevPosts => {
      console.log('Posts before delete:', prevPosts);
      const updatedPosts = prevPosts.filter(post => post.id !== postId);
      console.log('Posts after delete:', updatedPosts);
      return updatedPosts;
    });
  };

  return (
    <PostContext.Provider value={{ posts, addPost, addComment, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
