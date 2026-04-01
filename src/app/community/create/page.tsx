'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import PostForm from '@/components/community/post-form';

const CreatePostPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 h-10 px-4 py-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Create Post</h1>
      <PostForm />
    </div>
  );
};

export default CreatePostPage;
