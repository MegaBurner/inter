'use server';

/**
 * @fileOverview An AI agent that suggests the optimal route to a destination, considering accessibility needs.
 *
 * - optimizeRoute - A function that handles the route optimization process.
 * - OptimizeRouteInput - The input type for the optimizeRoute function.
 * - OptimizeRouteOutput - The return type for the optimizeRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRouteInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  destination: z.string().describe('The destination for the route.'),
  accessibilityNeeds: z
    .string()
    .describe(
      'A comma-separated list of accessibility needs, such as avoiding stairs, elevators, or crowded pathways.'
    ),
  currentTime: z.string().describe('The current time, in ISO format.'),
});
export type OptimizeRouteInput = z.infer<typeof OptimizeRouteInputSchema>;

const OptimizeRouteOutputSchema = z.object({
  routeDescription: z
    .string()
    .describe(
      'A detailed description of the optimal route, considering accessibility needs and current conditions.'
    ),
  estimatedTime: z.string().describe('The estimated time to complete the route.'),
  distance: z.string().describe('The distance of the route.'),
});
export type OptimizeRouteOutput = z.infer<typeof OptimizeRouteOutputSchema>;

export async function optimizeRoute(input: OptimizeRouteInput): Promise<OptimizeRouteOutput> {
  return optimizeRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRoutePrompt',
  input: {schema: OptimizeRouteInputSchema},
  output: {schema: OptimizeRouteOutputSchema},
  prompt: `You are a route optimization expert specializing in accessible routes for students with accessibility needs.

You will use the provided information to generate the best route for the student, and provide a detailed description of that route, including estimated time and distance.

Start Location: {{{startLocation}}}
Destination: {{{destination}}}
Accessibility Needs: {{{accessibilityNeeds}}}
Current Time: {{{currentTime}}}`,
});

const optimizeRouteFlow = ai.defineFlow(
  {
    name: 'optimizeRouteFlow',
    inputSchema: OptimizeRouteInputSchema,
    outputSchema: OptimizeRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
