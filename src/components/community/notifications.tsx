'use client';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell } from 'lucide-react';

export const mockNotifications = [
    { id: 1, text: 'Jane Smith mentioned you in a comment: "Totally agree @CurrentUser!"' },
    { id: 2, text: 'Sam Wilson sent you a friend request.' },
    { id: 3, text: 'Your post "Feeling Grateful" received a new comment.' },
];

export const Notifications = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="relative rounded-full p-0 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Bell className="h-4 w-4" />
                    {mockNotifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800" />
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        <p className="text-sm text-muted-foreground">You have {mockNotifications.length} unread messages.</p>
                    </div>
                    <div className="grid gap-2">
                        {mockNotifications.map(notification => (
                            <div key={notification.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{notification.text}</p>
                                    <div className="mt-2">
                                        <button className="text-xs text-blue-500 hover:underline">Reply</button>
                                        <button className="ml-2 text-xs text-gray-500 hover:underline">Mark as read</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}