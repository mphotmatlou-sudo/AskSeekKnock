'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generatePrayerFromVerse } from '@/ai/flows/generate-prayer-from-verse';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, BookOpen, Sparkles, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { bookMapping } from '@/lib/bible-mapping';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
});

type VerseWithPrayer = {
  reference: string;
  text: string;
  prayer?: string;
  isGeneratingPrayer?: boolean;
};

export default function BibleVersesPage() {
  const [verses, setVerses] = useState<VerseWithPrayer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [directReference, setDirectReference] = useState('');
  const [isDirectSearchLoading, setIsDirectSearchLoading] = useState(false);
  const [directReferenceResult, setDirectReferenceResult] = useState<{ reference: string; text: string } | null>(null);
  const [directReferenceError, setDirectReferenceError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  async function handleDirectReferenceSearch() {
    setIsDirectSearchLoading(true);
    setDirectReferenceResult(null);
    setDirectReferenceError(null);
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(directReference)}?verse_numbers=true`);
      const data = await response.json();

      if (response.ok && data.text) {
        setDirectReferenceResult({ reference: directReference, text: data.text });
      } else {
        setDirectReferenceError(data.error || 'Verse not found.');
      }
    } catch (e) {
      setDirectReferenceError('Failed to fetch verse. Please try again.');
      console.error(e);
    }
    setIsDirectSearchLoading(false);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setVerses([]);
    try {
      const response = await fetch(`/api/bible/verses?keyword=${encodeURIComponent(values.topic)}`);
      const data = await response.json();

      if (response.ok) {
        const formattedVerses = data.map((v: any) => ({
          reference: `${bookMapping[v.b] || 'Unknown Book'} ${v.c}:${v.v}`,
          text: v.t,
        }));
        setVerses(formattedVerses);
      } else {
        setError(data.error || 'Failed to find verses.');
      }
    } catch (e) {
      setError('Failed to find verses. Please try again.');
      console.error(e);
    }
    setIsLoading(false);
  }

  async function handleGeneratePrayer(verse: string, index: number) {
    setVerses((prev) =>
      prev.map((v, i) =>
        i === index ? { ...v, isGeneratingPrayer: true } : v
      )
    );
    try {
      const result = await generatePrayerFromVerse({ bibleVerse: verse });
      setVerses((prev) =>
        prev.map((v, i) =>
          i === index
            ? { ...v, prayer: result.prayer, isGeneratingPrayer: false }
            : v
        )
      );
    } catch (e) {
      setError('Failed to generate prayer. Please try again.');
      console.error(e);
      setVerses((prev) =>
        prev.map((v, i) =>
          i === index ? { ...v, isGeneratingPrayer: false } : v
        )
      );
    }
  }

  const handleAddToSession = (verse: string) => {
    // This is a placeholder for the actual "add to session" logic.
    // In a real implementation, this would likely interact with a global state or context.
    console.log('Added to session:', verse);
    toast({
      title: 'Verse Added',
      description: `"${verse}" has been added to your prayer session.`,
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Bible Verse Locator
        </h2>
        <p className="text-muted-foreground">
          Find relevant Bible verses for any topic and generate a prayer.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find Verses</CardTitle>
          <CardDescription>
            Enter a topic below to discover related Bible verses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Faith, Love, Forgiveness" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Find Verses
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search by Reference</CardTitle>
          <CardDescription>
            Enter a Bible verse reference (e.g., John 3:16) to find its text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="e.g., John 3:16"
              value={directReference}
              onChange={(e) => setDirectReference(e.target.value)}
            />
            <Button onClick={handleDirectReferenceSearch} disabled={isDirectSearchLoading}>
              {isDirectSearchLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Search
            </Button>
          </div>
          {directReferenceResult && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
              <p className="font-semibold">{directReferenceResult.reference}</p>
              <p className="text-muted-foreground">{directReferenceResult.text}</p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => handleAddToSession(directReferenceResult.reference)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add to Session
              </Button>
            </div>
          )}
          {directReferenceError && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{directReferenceError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {error && (
         <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {verses.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <h3 className="text-2xl font-semibold font-headline">Results</h3>
          {verses.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {item.reference}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.text}</p>
                {item.prayer ? (
                    <Alert>
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle>Generated Prayer</AlertTitle>
                        <AlertDescription className="whitespace-pre-wrap">{item.prayer}</AlertDescription>
                    </Alert>
                ) : (
                  <p className="text-muted-foreground italic">
                    Click the button to generate a prayer from this verse.
                  </p>
                )}
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  onClick={() => handleGeneratePrayer(item.text, index)}
                  disabled={item.isGeneratingPrayer || !!item.prayer}
                >
                  {item.isGeneratingPrayer && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate Prayer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAddToSession(item.reference)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add to Session
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
