'use server';

/**
 * @fileOverview An AI agent that finds relevant Bible verses for a given topic.
 *
 * - findRelevantVerses - A function that takes a topic and returns relevant Bible verses.
 * - FindRelevantVersesInput - The input type for the findRelevantVerses function.
 * - FindRelevantVersesOutput - The return type for the findRelevantVerses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindRelevantVersesInputSchema = z.object({
  topic: z.string().describe('The topic to find relevant Bible verses for.'),
});
export type FindRelevantVersesInput = z.infer<typeof FindRelevantVersesInputSchema>;

const FindRelevantVersesOutputSchema = z.object({
  verses: z.array(z.object({
    reference: z.string(),
    text: z.string(),
  })).describe('An array of Bible verses relevant to the topic, including their text.'),
});
export type FindRelevantVersesOutput = z.infer<typeof FindRelevantVersesOutputSchema>;

export async function findRelevantVerses(input: FindRelevantVersesInput): Promise<FindRelevantVersesOutput> {
  return findRelevantVersesFlow(input);
}

const getBibleVerses = ai.defineTool({
  name: 'getBibleVerses',
  description: 'Returns the text of a given Bible verse reference.',
  inputSchema: z.object({
    verseReference: z.string().describe('The Bible verse reference (e.g., "John 3:16").'),
  }),
  outputSchema: z.string(), // Changed to return a single string (the verse text)
},
async (input) => {
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(input.verseReference)}?verse_numbers=true`);
      if (!response.ok) {
        return `Verse not found for ${input.verseReference}`;
      }
      const data = await response.json();
      return data.text || `Verse not found for ${input.verseReference}`;
    } catch (error) {
      return `Verse not found for ${input.verseReference}`;
    }
  }
);


const prompt = ai.definePrompt({
  name: 'findRelevantVersesPrompt',
  tools: [getBibleVerses],
  input: {schema: FindRelevantVersesInputSchema},
  output: {schema: FindRelevantVersesOutputSchema},
  prompt: `You are a helpful assistant that finds relevant Bible verses for a given topic.
  The user will provide a topic, and you should identify relevant Bible verse references.
  For each relevant verse reference you find, call the 'getBibleVerses' tool to retrieve the actual text of the verse.
  Return an array of objects, where each object contains the 'reference' and 'text' of the verse.

  Topic: {{{topic}}}`, 
});

const findRelevantVersesFlow = ai.defineFlow(
  {
    name: 'findRelevantVersesFlow',
    inputSchema: FindRelevantVersesInputSchema,
    outputSchema: FindRelevantVersesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
