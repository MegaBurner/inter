'use server';

import { optimizeRoute as optimizeRouteFlow, type OptimizeRouteInput, type OptimizeRouteOutput } from '@/ai/flows/optimize-route';
import { z } from 'zod';

const OptimizeRouteActionInputSchema = z.object({
  startLocation: z.string().min(1, "Start location is required."),
  destination: z.string().min(1, "Destination is required."),
  accessibilityNeeds: z.string().optional(), // Can be empty
  currentTime: z.string().datetime("Invalid date format for current time.").optional(),
});

export interface ActionState {
  data?: OptimizeRouteOutput;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export async function optimizeRouteAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  
  const rawFormData = {
    startLocation: formData.get('startLocation'),
    destination: formData.get('destination'),
    accessibilityNeeds: formData.get('accessibilityNeeds'),
    currentTime: formData.get('currentTime') || new Date().toISOString(), // Default to now if not provided
  };

  const validatedFields = OptimizeRouteActionInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      status: 'error',
      error: "Invalid form data. Please check your inputs.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const inputData: OptimizeRouteInput = {
    startLocation: validatedFields.data.startLocation,
    destination: validatedFields.data.destination,
    accessibilityNeeds: validatedFields.data.accessibilityNeeds || "none", // Default to "none" if empty for GenAI
    currentTime: validatedFields.data.currentTime || new Date().toISOString(),
  };

  try {
    const result = await optimizeRouteFlow(inputData);
    return { status: 'success', data: result };
  } catch (e) {
    console.error("Error optimizing route:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { status: 'error', error: `Failed to optimize route: ${errorMessage}` };
  }
}
