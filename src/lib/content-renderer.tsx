'use client';

import Link from 'next/link';

export const renderContentWithLinks = (content: string) => {
  const parts = content.split(/([@#]\w+)/g);

  return parts.map((part, index) => {
    if (part.startsWith('@')) {
      const username = part.substring(1);
      // In a real app, you'd want to link to a user profile by ID, not username
      return (
        <Link key={index} href={`/profile/${username}`} className="text-blue-500 hover:underline font-semibold">
          {part}
        </Link>
      );
    }
    if (part.startsWith('#')) {
      const tag = part.substring(1);
      return (
        <Link key={index} href={`/community?tag=${tag}`} className="text-indigo-500 hover:underline font-semibold">
          {part}
        </Link>
      );
    }
    return part;
  });
};
