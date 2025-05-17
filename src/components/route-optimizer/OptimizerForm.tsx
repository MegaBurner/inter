'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { optimizeRouteAction, type ActionState } from '@/app/route-optimizer/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Send } from "lucide-react";
import RouteResultDisplay from './RouteResultDisplay';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState: ActionState = {
  status: 'idle',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full btn-interactive">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Optimizing...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Find Optimal Route
        </>
      )}
    </Button>
  );
}

export default function OptimizerForm() {
  const [state, formAction] = useFormState(optimizeRouteAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'success' && state.data) {
      toast({
        title: "Route Optimized!",
        description: "Scroll down to see your personalized route.",
      });
      // Optionally reset form: formRef.current?.reset();
    } else if (state.status === 'error' && state.error) {
       toast({
        title: "Optimization Failed",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle>Route Optimizer</CardTitle>
            <CardDescription>
              Enter your start, destination, and any accessibility needs to find the best route.
              Current time will be automatically determined.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="startLocation">Start Location</Label>
              <Input id="startLocation" name="startLocation" placeholder="e.g., Main Entrance" required className="mt-1" />
              {state.fieldErrors?.startLocation && <p className="text-sm text-destructive mt-1">{state.fieldErrors.startLocation.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" name="destination" placeholder="e.g., Lecture Hall B205" required className="mt-1" />
              {state.fieldErrors?.destination && <p className="text-sm text-destructive mt-1">{state.fieldErrors.destination.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="accessibilityNeeds">Accessibility Needs (Optional)</Label>
              <Textarea
                id="accessibilityNeeds"
                name="accessibilityNeeds"
                placeholder="e.g., avoid stairs, prefer ramps, no crowded areas"
                className="mt-1 min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground mt-1">Leave blank if none, or list your requirements.</p>
            </div>
             {/* Hidden input for currentTime, will be set by action if not provided */}
             <input type="hidden" name="currentTime" defaultValue={new Date().toISOString()} />

          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.status === 'error' && state.error && !state.fieldErrors && (
         <Alert variant="destructive" className="max-w-2xl mx-auto">
           <AlertCircle className="h-4 w-4" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{state.error}</AlertDescription>
         </Alert>
      )}

      {state.status === 'success' && state.data && (
        <div className="max-w-2xl mx-auto mt-8">
          <RouteResultDisplay result={state.data} />
        </div>
      )}
    </div>
  );
}
