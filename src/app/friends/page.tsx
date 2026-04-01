'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const mockUsers = [
  { id: '2', name: 'Jane Smith', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'Friend' as const },
  { id: '3', name: 'Sam Wilson', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'Pending' as const },
  { id: '4', name: 'Emily White', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'Not Friend' as const },
  { id: '5', name: 'Chris Green', imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'Friend' as const },
];

interface User {
  id: string;
  name: string;
  imageUrl: string;
  status: 'Friend' | 'Pending' | 'Not Friend';
}

const FriendCard = ({ user }: { user: User }) => {
    const getButton = (status: string) => {
        switch (status) {
            case 'Friend':
                return <button className="ml-auto px-3 py-1 text-xs rounded-md bg-red-500 text-white">Remove</button>;
            case 'Pending':
                return <button className="ml-auto px-3 py-1 text-xs rounded-md bg-gray-500 text-white">Pending</button>;
            case 'Not Friend':
                return <button className="ml-auto px-3 py-1 text-xs rounded-md bg-blue-500 text-white">Add</button>;
            default: {
                return null;
            }
        }
    }

    return (
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 p-4 rounded-xl shadow-lg flex items-center gap-4">
            <img src={user.imageUrl} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white/50" />
            <div className="flex-grow">
                <Link href={`/profile/${user.id}`} className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">
                    {user.name}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">@{user.name.toLowerCase().replace(' ', '')}</p>
            </div>
            {getButton(user.status)}
        </div>
    );
}

const FriendsPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Friends</h1>
      <div className="mb-6 p-4 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 flex items-center gap-4">
        <input
          type="email"
          placeholder="Enter email to invite a friend..."
          className="flex-grow rounded-md border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Invite</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockUsers.map(user => (
            <FriendCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
