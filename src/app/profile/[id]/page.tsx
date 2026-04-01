import React from 'react';
import FriendList from '@/components/community/friend-list';

const mockFriends = [
  { id: '2', name: 'Jane Smith', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'Sam Wilson', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <img src={`https://randomuser.me/api/portraits/men/${params.id}.jpg`} alt="User profile" className="w-24 h-24 rounded-full mr-4" />
        <div>
          <h1 className="text-3xl font-bold">User {params.id}</h1>
          <p className="text-gray-600 dark:text-gray-400">Bio goes here...</p>
        </div>
      </div>
      <FriendList friends={mockFriends} />
    </div>
  );
};

export default ProfilePage;
