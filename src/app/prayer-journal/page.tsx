'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useJournal } from '@/context/JournalContext';
import type { JournalEntry, JournalCategory } from '@/lib/types';
import { JournalEditor } from '@/components/journal-editor';
import { PlusCircle, Edit, Trash } from 'lucide-react';

export default function PrayerJournalPage() {
  const { entries, deleteEntry } = useJournal();
  const [selectedCategory, setSelectedCategory] = useState<JournalCategory | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  const handleNewEntry = () => {
    setEditingEntry(null);
    setIsEditorOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsEditorOpen(true);
  };

  const handleDeleteEntry = (entryId: string) => {
    deleteEntry(entryId);
  };

  const filteredEntries = entries
    .filter(entry => selectedCategory === 'all' || entry.category === selectedCategory)
    .filter(entry => !selectedDate || new Date(entry.timestamp).toDateString() === selectedDate.toDateString());

  const entryDates = entries.map(entry => new Date(entry.timestamp));

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Prayer Journal
          </h2>
          <p className="text-muted-foreground">
            Your personal space for reflection and spiritual insights.
          </p>
        </div>
        <Button onClick={handleNewEntry}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Entry
        </Button>
      </div>

      <Tabs defaultValue="entries">
        <TabsList>
          <TabsTrigger value="entries">Journal Entries</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="entries">
          <Card>
            <CardHeader>
              <CardTitle>Your Entries</CardTitle>
              <CardDescription>
                <Select onValueChange={(value: JournalCategory | 'all') => setSelectedCategory(value)} defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Reflections & Perceptions">Reflections & Perceptions</SelectItem>
                    <SelectItem value="Dreams & Visions">Dreams & Visions</SelectItem>
                    <SelectItem value="Revelations & Words">Revelations & Words</SelectItem>
                  </SelectContent>
                </Select>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredEntries.map(entry => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{entry.category}</CardTitle>
                        <CardDescription>{new Date(entry.timestamp).toLocaleDateString()}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditEntry(entry)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{entry.content}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    modifiers={{ hasEntry: entryDates }}
                    modifiersStyles={{ hasEntry: { fontWeight: 'bold' } }}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Entries for {selectedDate ? selectedDate.toLocaleDateString() : 'Today'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredEntries.length > 0 ? (
                    filteredEntries.map(entry => (
                      <Card key={entry.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{entry.category}</CardTitle>
                              <CardDescription>{new Date(entry.timestamp).toLocaleDateString()}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditEntry(entry)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>{entry.content}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p>No entries for this date.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <JournalEditor
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        entry={editingEntry}
      />
    </div>
  );
}