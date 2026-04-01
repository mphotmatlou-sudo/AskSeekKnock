import React from 'react';
import { X } from 'lucide-react';

interface LinkPreviewCardProps {
  url: string;
  onRemove: () => void;
}

const LinkPreviewCard: React.FC<LinkPreviewCardProps> = ({ url, onRemove }) => {
  return (
    <div className="mt-2 border dark:border-gray-700 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-900/30 relative">
        <button onClick={onRemove} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
            <X size={18} />
        </button>
        <p className="font-semibold text-blue-500">Mock Title for {url}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This is a mock description of the link preview. The real description will be scraped from the URL.</p>
        <div className="mt-2">
            <img src="https://placehold.co/600x400.png" alt="Link preview" className="w-full h-auto rounded-md" />
        </div>
    </div>
  );
};

export default LinkPreviewCard;
