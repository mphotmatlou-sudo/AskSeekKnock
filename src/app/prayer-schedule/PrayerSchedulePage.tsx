'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { scheduledPrayers as initialPrayers } from '@/lib/data';
import type { ScheduledPrayer } from '@/lib/types';
import { Calendar as CalendarIcon, PlusCircle, Video } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PrayerSchedulePage() {
  const [prayers, setPrayers] = useState<ScheduledPrayer[]>(initialPrayers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPrayerType, setSelectedPrayerType] = useState<'weekly group' | 'morning devotion' | 'evening devotion' | 'daily' | 'all'>('all');
  const { toast } = useToast();

  const handleAddPrayer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const notes = formData.get('notes') as string;
    const dateTime = formData.get('datetime') as string;
    const type = formData.get('type') as 'weekly group' | 'morning devotion' | 'evening devotion' | 'daily';

    if (!title || !dateTime || !type) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a title, date/time, and type for the prayer session.',
        variant: 'destructive',
      });
      return;
    }

    const newPrayer: ScheduledPrayer = {
      id: `prayer-${Date.now()}`,
      title,
      timestamp: new Date(dateTime).getTime(),
      notes,
      participants: ['You'],
      type,
    };

    setPrayers([newPrayer, ...prayers].sort((a, b) => a.timestamp - b.timestamp));
    setIsDialogOpen(false);
    toast({
      title: 'Prayer Scheduled',
      description: 'The new prayer session has been added to your schedule.',
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Prayer Schedule
          </h2>
          <p className="text-muted-foreground">
            Organize and schedule your prayer sessions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select onValueChange={(value: 'weekly group' | 'morning devotion' | 'evening devotion' | 'daily' | 'all') => setSelectedPrayerType(value)} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="weekly group">Weekly Group</SelectItem>
              <SelectItem value="morning devotion">Morning Devotion</SelectItem>
              <SelectItem value="evening devotion">Evening Devotion</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Schedule Prayer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Prayer Session</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddPrayer} className="space-y-4 py-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                  <Input id="title" name="title" placeholder="e.g., Weekly Intercession" required />
                </div>
                <div>
                  <label htmlFor="datetime" className="block text-sm font-medium mb-1">Date and Time</label>
                  <Input id="datetime" name="datetime" type="datetime-local" required />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-1">Prayer Type</label>
                  <Select name="type" defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Select prayer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly group">Weekly Group</SelectItem>
                      <SelectItem value="morning devotion">Morning Devotion</SelectItem>
                      <SelectItem value="evening devotion">Evening Devotion</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes / Topics</label>
                  <Textarea id="notes" name="notes" placeholder="What will you be praying about?" rows={4} />
                </div>
                <DialogFooter>
                  <Button type="submit">Schedule</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {prayers.filter(prayer => selectedPrayerType === 'all' || prayer.type === selectedPrayerType).length > 0 ? (
          prayers.filter(prayer => selectedPrayerType === 'all' || prayer.type === selectedPrayerType).map((prayer) => (
            <Card key={prayer.id}>
              <CardHeader>
                <CardTitle>{prayer.title}</CardTitle>
                <CardDescription>{format(new Date(prayer.timestamp), 'PPPP p')} - {prayer.type}</CardDescription>
              </CardHeader>
              <CardContent>
                {prayer.notes && <p className="text-muted-foreground mb-4">{prayer.notes}</p>}
                 <p className="text-sm font-medium">Participants: {prayer.participants.join(', ')}</p>
              </CardContent>
              <CardFooter className="gap-2">
                  <Button variant="outline" disabled>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Add to Google Calendar
                  </Button>
                   <Button variant="outline" disabled>
                      <Video className="mr-2 h-4 w-4" />
                      Join with Google Meet
                  </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-12">No {selectedPrayerType !== 'all' ? selectedPrayerType + ' ' : ''}prayer sessions scheduled.</p>
        )}
      </div>
    </div>
  );
}