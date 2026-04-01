import React from 'react';

interface FriendListProps {
  friends: { id: string; name: string; imageUrl: string }[];
}

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
            <img src={friend.imageUrl} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
            <span className="font-semibold">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
