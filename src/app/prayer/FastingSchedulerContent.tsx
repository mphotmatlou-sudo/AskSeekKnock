'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon, PlusCircle, Video, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface FastingDay {
  date: Date;
  completed: boolean;
  notes: string;
}

export default function FastingSchedulerContent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [fastingDays, setFastingDays] = useState<FastingDay[]>([]);
  const [selectedDayNotes, setSelectedDayNotes] = useState<string>('');
  const [selectedDayCompleted, setSelectedDayCompleted] = useState<boolean>(false);
  const { toast } = useToast();

  // Load fasting days from local storage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFastingDays = localStorage.getItem('fastingDays');
      if (storedFastingDays) {
        const parsedDays: FastingDay[] = JSON.parse(storedFastingDays).map((item: any) => ({
          date: new Date(item.date),
          completed: item.completed,
          notes: item.notes,
        }));
        setFastingDays(parsedDays);
      }
    }
  }, []);

  // Save fasting days to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fastingDays', JSON.stringify(fastingDays));
    }
  }, [fastingDays]);

  // Update selected day's notes and completion status when selectedDate or fastingDays changes
  useEffect(() => {
    if (selectedDate) {
      const day = fastingDays.find(d => d.date.toDateString() === selectedDate.toDateString());
      if (day) {
        setSelectedDayNotes(day.notes);
        setSelectedDayCompleted(day.completed);
      } else {
        setSelectedDayNotes('');
        setSelectedDayCompleted(false);
      }
    }
  }, [selectedDate, fastingDays]);

  const handleMarkFastingDay = () => {
    if (selectedDate) {
      setFastingDays(prev => {
        const isFastingDay = prev.some(day => day.date.toDateString() === selectedDate.toDateString());
        if (isFastingDay) {
          // Remove fasting day
          return prev.filter(day => day.date.toDateString() !== selectedDate.toDateString());
        } else {
          // Add new fasting day
          const newFastingDay: FastingDay = {
            date: selectedDate,
            completed: false,
            notes: '',
          };
          return [...prev, newFastingDay];
        }
      });
      toast({
        title: 'Fasting Day Updated',
        description: selectedDate.toDateString() + (fastingDays.some(day => day.date.toDateString() === selectedDate.toDateString()) ? ' removed from' : ' added to') + ' fasting days.',
      });
    }
  };

  const handleToggleCompletion = () => {
    if (selectedDate) {
      setFastingDays(prev =>
        prev.map(day =>
          day.date.toDateString() === selectedDate.toDateString()
            ? { ...day, completed: !day.completed }
            : day
        )
      );
      setSelectedDayCompleted(prev => !prev);
      toast({
        title: 'Fasting Day Status Updated',
        description: selectedDate.toDateString() + (selectedDayCompleted ? ' marked as incomplete.' : ' marked as complete.'),
      });
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setSelectedDayNotes(newNotes);
    if (selectedDate) {
      setFastingDays(prev =>
        prev.map(day =>
          day.date.toDateString() === selectedDate.toDateString()
            ? { ...day, notes: newNotes }
            : day
        )
      );
    }
  };

  const handleDeleteFastingDay = (dateToDelete: Date) => {
    setFastingDays(prev => prev.filter(day => day.date.toDateString() !== dateToDelete.toDateString()));
    toast({
      title: 'Fasting Day Deleted',
      description: format(dateToDelete, 'PPP') + ' has been removed from your fasting schedule.',
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Fasting Schedule
          </h2>
          <p className="text-muted-foreground">
            Schedule and track your fasting days.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Fasting Calendar</CardTitle>
            <CardDescription>Select days to mark as fasting days.</CardDescription>
          </CardHeader>
          <CardContent>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                fasting: fastingDays.map(day => day.date),
                completed: fastingDays.filter(day => day.completed).map(day => day.date),
              }}
              modifiersClassNames={{
                fasting: 'bg-red-500 text-white',
                completed: 'bg-green-500 text-white',
              }}
            />
            <Button
              onClick={handleMarkFastingDay}
              className="mt-2 w-full"
              disabled={!selectedDate}
            >
              {fastingDays.some(day => selectedDate && day.date.toDateString() === selectedDate.toDateString()) ? 'Unmark Fasting Day' : 'Mark as Fasting Day'}
            </Button>

            {selectedDate && fastingDays.some(day => day.date.toDateString() === selectedDate.toDateString()) && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="completed-fasting-day"
                    checked={selectedDayCompleted}
                    onChange={handleToggleCompletion}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="completed-fasting-day" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mark as Completed
                  </label>
                </div>
                <div>
                  <label htmlFor="fasting-notes" className="text-sm font-medium leading-none">Notes:</label>
                  <textarea
                    id="fasting-notes"
                    value={selectedDayNotes}
                    onChange={handleNotesChange}
                    placeholder="Add notes for this fasting day..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows={3}
                  />
                </div>
                <p className="text-red-500 text-center font-semibold">This is a fasting day!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Fasting Days Lexicon</CardTitle>
            <CardDescription>Overview of all fasting days.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">Upcoming Fasting Days</h3>
            {fastingDays.filter(day => !day.completed).length === 0 ? (
              <p className="text-muted-foreground">No upcoming fasting days.</p>
            ) : (
              <div className="space-y-4 max-h-[200px] overflow-y-auto">
                {fastingDays.filter(day => !day.completed).sort((a, b) => a.date.getTime() - b.date.getTime()).map((day, index) => (
                  <div key={index} className="border p-3 rounded-md space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{format(day.date, 'PPP')}</p>
                      <Checkbox
                        checked={day.completed}
                        onCheckedChange={(checked) => {
                          setFastingDays(prev =>
                            prev.map(d =>
                              d.date.toDateString() === day.date.toDateString()
                                ? { ...d, completed: checked as boolean }
                                : d
                            )
                          );
                          toast({
                            title: 'Fasting Day Status Updated',
                            description: format(day.date, 'PPP') + (checked ? ' marked as complete.' : ' marked as incomplete.'),
                          });
                        }}
                      />
                    </div>
                    <Textarea
                      value={day.notes}
                      onChange={(e) => {
                        const newNotes = e.target.value;
                        setFastingDays(prev =>
                          prev.map(d =>
                            d.date.toDateString() === day.date.toDateString()
                              ? { ...d, notes: newNotes }
                              : d
                          )
                        );
                      }}
                      placeholder="Add notes..."
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}

            <h3 className="text-lg font-semibold mt-6">Previous Fasting Days (Completed)</h3>
            {fastingDays.filter(day => day.completed).length === 0 ? (
              <p className="text-muted-foreground">No completed fasting days yet.</p>
            ) : (
              <div className="space-y-4 max-h-[200px] overflow-y-auto">
                {fastingDays.filter(day => day.completed).sort((a, b) => b.date.getTime() - a.date.getTime()).map((day, index) => (
                  <div key={index} className="border p-3 rounded-md space-y-2 bg-gray-100 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-600 dark:text-gray-400">{format(day.date, 'PPP')}</p>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={day.completed}
                          onCheckedChange={(checked) => {
                            setFastingDays(prev =>
                              prev.map(d =>
                                d.date.toDateString() === day.date.toDateString()
                                  ? { ...d, completed: checked as boolean }
                                  : d
                              )
                            );
                            toast({
                              title: 'Fasting Day Status Updated',
                              description: format(day.date, 'PPP') + (checked ? ' marked as complete.' : ' marked as incomplete.'),
                            });
                          }}
                        />
                        <XCircle
                          className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-600"
                          onClick={() => handleDeleteFastingDay(day.date)}
                        />
                      </div>
                    </div>
                    <Textarea
                      value={day.notes}
                      onChange={(e) => {
                        const newNotes = e.target.value;
                        setFastingDays(prev =>
                          prev.map(d =>
                            d.date.toDateString() === day.date.toDateString()
                              ? { ...d, notes: newNotes }
                              : d
                          )
                        );
                      }}
                      placeholder="Add notes..."
                      rows={2}
                      className="bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}