
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJournal } from '@/context/JournalContext';
import type { JournalEntry, JournalCategory } from '@/lib/types';

interface JournalEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry?: JournalEntry | null;
}

export const JournalEditor = ({ open, onOpenChange, entry: initialEntry }: JournalEditorProps) => {
  const { addEntry, updateEntry } = useJournal();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<JournalCategory>('Reflections & Perceptions');

  useEffect(() => {
    if (initialEntry) {
      setContent(initialEntry.content);
      setCategory(initialEntry.category);
    } else {
      setContent('');
      setCategory('Reflections & Perceptions');
    }
  }, [initialEntry]);

  const handleSave = () => {
    if (initialEntry) {
      updateEntry({ ...initialEntry, content, category });
    } else {
      addEntry({ content, category });
    }
    onOpenChange(false);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value as JournalCategory);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialEntry ? 'Edit Entry' : 'New Journal Entry'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={handleCategoryChange} value={category}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Reflections & Perceptions">Reflections & Perceptions</SelectItem>
              <SelectItem value="Dreams & Visions">Dreams & Visions</SelectItem>
              <SelectItem value="Revelations & Words">Revelations & Words</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
