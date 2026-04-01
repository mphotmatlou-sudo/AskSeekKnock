'use client';

import React, { useState } from 'react';
import { usePosts } from '@/context/PostContext';
import { useRouter } from 'next/navigation';

const PostForm = () => {
  const { addPost } = usePosts();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [category, setCategory] = useState('General Discussion');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) {
      // Basic validation
      alert('Title and category are required.');
      return;
    }
    addPost({ title, content, linkUrl, category });
    router.push('/community'); // Redirect to feed after posting
  };

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 p-6 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-800 dark:text-gray-200">Category *</label>
                <select id="category" name="category" required value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option>General Discussion</option>
                    <option>Scripture</option>
                    <option>Music, Arts & Culture</option>
                    <option>Literature</option>
                    <option>Fashion & Merchandise</option>
                    <option>Paraphernalia</option>
                </select>
            </div>

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-800 dark:text-gray-200">Title *</label>
                <input type="text" id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-800 dark:text-gray-200">Content</label>
                <textarea id="content" name="content" rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
            </div>

            <div>
                <label htmlFor="linkUrl" className="block text-sm font-medium text-gray-800 dark:text-gray-200">Link URL</label>
                <input type="url" id="linkUrl" name="linkUrl" placeholder="https://example.com" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div className="flex justify-end gap-4">
                <button type="button" onClick={() => router.back()} className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-6 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                    Cancel
                </button>
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-gray-800">Create Post</button>
            </div>
        </form>
    </div>
  );
};

export default PostForm;
