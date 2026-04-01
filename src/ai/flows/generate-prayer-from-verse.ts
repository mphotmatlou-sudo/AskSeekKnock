'use server';

/**
 * @fileOverview Generates a short prayer based on a provided Bible verse.
 *
 * - generatePrayerFromVerse - A function that generates a prayer from a Bible verse.
 * - GeneratePrayerFromVerseInput - The input type for the generatePrayerFromVerse function.
 * - GeneratePrayerFromVerseOutput - The return type for the generatePrayerFromVerse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePrayerFromVerseInputSchema = z.object({
  bibleVerse: z
    .string()
    .describe('The Bible verse to generate a prayer from.'),
});
export type GeneratePrayerFromVerseInput = z.infer<
  typeof GeneratePrayerFromVerseInputSchema
>;

const GeneratePrayerFromVerseOutputSchema = z.object({
  prayer: z.string().describe('A short prayer generated from the Bible verse.'),
});
export type GeneratePrayerFromVerseOutput = z.infer<
  typeof GeneratePrayerFromVerseOutputSchema
>;

export async function generatePrayerFromVerse(
  input: GeneratePrayerFromVerseInput
): Promise<GeneratePrayerFromVerseOutput> {
  return generatePrayerFromVerseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePrayerFromVersePrompt',
  input: {schema: GeneratePrayerFromVerseInputSchema},
  output: {schema: GeneratePrayerFromVerseOutputSchema},
  prompt: `You are a helpful AI assistant that generates short prayers based on Bible verses.

  Verse: {{{bibleVerse}}}

  Please generate a short prayer based on the verse above:
  `,
});

const generatePrayerFromVerseFlow = ai.defineFlow(
  {
    name: 'generatePrayerFromVerseFlow',
    inputSchema: GeneratePrayerFromVerseInputSchema,
    outputSchema: GeneratePrayerFromVerseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
