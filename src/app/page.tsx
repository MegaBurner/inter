'use client';

import { useState } from 'react';
import type { ARNavigationState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ARViewMock from '@/components/ar/ARViewMock';
import { Wand2 } from 'lucide-react'; // For "Start AR" or similar

export default function ARNavigationPage() {
  const [destination, setDestination] = useState('');
  const [navigationState, setNavigationState] = useState<ARNavigationState>({
    status: 'prompt_destination',
  });

  const handleStartNavigation = () => {
    if (!destination) {
      // Basic validation, could use react-hook-form for more complex scenarios
      alert("Please enter a destination.");
      return;
    }
    setNavigationState({
      status: 'navigating',
      destination: destination,
      currentInstruction: 'Proceed straight 100m',
      eta: '5 mins'
    });
  };

  // Mock functions to simulate AR events
  const simulateObstacle = () => {
    setNavigationState(prev => ({
      ...prev,
      status: 'obstacle_alert',
      obstacleMessage: 'Stairs ahead. Wheelchair ramp is closed for maintenance.',
    }));
    setTimeout(() => {
        setNavigationState(prev => ({ ...prev, status: 'rerouting', currentInstruction: 'Calculating new accessible route...' }));
        setTimeout(() => {
            setNavigationState(prev => ({ ...prev, status: 'navigating', currentInstruction: 'Turn left in 20m', eta: '7 mins' }));
        }, 3000);
    }, 3000);
  };

  const simulateArrival = () => {
    setNavigationState(prev => ({ ...prev, status: 'arrived' }));
  };
  
  const resetNavigation = () => {
    setDestination('');
    setNavigationState({ status: 'prompt_destination' });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-center">AR Navigation</h2>
      
      {navigationState.status === 'prompt_destination' && (
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Where to?</CardTitle>
            <CardDescription>Enter your destination to start AR navigation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Lecture Hall A101"
                className="mt-1"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartNavigation} className="w-full btn-interactive">
              <Wand2 className="mr-2 h-4 w-4" /> Start AR Navigation
            </Button>
          </CardFooter>
        </Card>
      )}

      {(navigationState.status !== 'prompt_destination') && (
        <>
          <ARViewMock navigationState={navigationState} />
          
          <div className="max-w-md mx-auto space-y-2">
            {navigationState.status === 'navigating' && (
                 <div className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={simulateObstacle}>Simulate Obstacle</Button>
                    <Button variant="outline" onClick={simulateArrival}>Simulate Arrival</Button>
                 </div>
            )}
            {(navigationState.status === 'arrived' || navigationState.status === 'obstacle_alert' && !navigationState.obstacleMessage?.includes("maintenance")) && ( // Don't show reset if mid-reroute for maintenance
              <Button onClick={resetNavigation} className="w-full" variant="secondary">
                End Navigation & Reset
              </Button>
            )}
          </div>
        </>
      )}

      <Card className="mt-8 max-w-md mx-auto shadow-lg">
        <CardHeader>
            <CardTitle>How to Use AR Navigation</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>1. Enter your desired destination.</p>
            <p>2. Tap "Start AR Navigation".</p>
            <p>3. Hold your phone up and follow the on-screen guidance projected onto your camera view.</p>
            <p>4. The app will alert you to obstacles and suggest alternative accessible routes.</p>
        </CardContent>
      </Card>

    </div>
  );
}
