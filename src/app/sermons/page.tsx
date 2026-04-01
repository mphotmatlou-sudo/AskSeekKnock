
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { sermonNotes as initialNotes } from '@/lib/data';
import type { SermonNote } from '@/lib/types';
import { ClipboardEdit, PlusCircle, Save, Edit, X, Tag, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  topic: z.string().min(2, { message: 'Topic must be at least 2 characters.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
});

export default function SermonsPage() {
  const [notes, setNotes] = useState<SermonNote[]>(initialNotes);
  const [editingNote, setEditingNote] = useState<SermonNote | null>(null);
  
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      topic: '',
      content: '',
    },
  });
  
  const editingForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });


  const handleAddNote = (values: z.infer<typeof formSchema>) => {
    const newSermonNote: SermonNote = {
      id: `sermon-${Date.now()}`,
      timestamp: Date.now(),
      ...values,
    };
    setNotes([newSermonNote, ...notes]);
    form.reset();
    toast({
      title: 'Sermon Note Saved',
      description: 'Your sermon notes have been successfully saved.',
    });
  };

  const handleUpdateNote = (values: z.infer<typeof formSchema>) => {
    if (!editingNote) return;

    setNotes(
      notes.map((note) =>
        note.id === editingNote.id ? { ...note, ...values } : note
      )
    );
    setEditingNote(null);
    toast({
        title: 'Sermon Note Updated',
        description: 'Your sermon notes have been successfully updated.',
    });
  };
  
  const startEditing = (note: SermonNote) => {
    setEditingNote(note);
    editingForm.reset({
        title: note.title,
        topic: note.topic,
        content: note.content,
    })
  }
  
  const notesByTopic = notes.reduce((acc, note) => {
    (acc[note.topic] = acc[note.topic] || []).push(note);
    return acc;
  }, {} as Record<string, SermonNote[]>);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Sermon Notes
          </h2>
          <p className="text-muted-foreground">
            Record and organize insights from sermons and teachings.
          </p>
        </div>
         <Button variant="outline" disabled>
          <FileDown className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </div>
      
      <Dialog open={!!editingNote} onOpenChange={(isOpen) => !isOpen && setEditingNote(null)}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Sermon Note</DialogTitle>
            </DialogHeader>
            <Form {...editingForm}>
            <form onSubmit={editingForm.handleSubmit(handleUpdateNote)} className="space-y-4 py-4">
                 <FormField
                    control={editingForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Sermon Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editingForm.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic / Theme</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Faith, Grace, Forgiveness" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editingForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your notes here..." rows={10} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
    </Dialog>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>New Sermon Note</CardTitle>
                    <CardDescription>Fill out the details below to add a new sermon note.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddNote)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., The Parable of the Sower" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Topic / Theme</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Faith, Love" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                    <Textarea placeholder="Type your notes here..." rows={6} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Note
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold font-headline pb-4">Past Notes</h3>
            {Object.keys(notesByTopic).length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(notesByTopic).map(([topic, topicNotes]) => (
                         <AccordionItem value={topic} key={topic}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4" />
                                    {topic} ({topicNotes.length})
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                {topicNotes.map((note) => (
                                <Card key={note.id}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between text-lg">
                                            <span>{note.title}</span>
                                            <Button variant="ghost" size="icon" onClick={() => startEditing(note)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </CardTitle>
                                        <CardDescription>{format(new Date(note.timestamp), 'PPP p')}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                                    </CardContent>
                                </Card>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                 <p className="text-muted-foreground">You haven't added any sermon notes yet. Use the form to get started.</p>
            )}
        </div>
      </div>
    </div>
  );
}
