'use client';

import { useState } from 'react';
import type { ARNavigationState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ARViewMock from '@/components/ar/ARViewMock';
import { Wand2, Map as MapIcon, Search, CornerUpRight } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function CampusNavigationPage() {
  const [destination, setDestination] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [navigationState, setNavigationState] = useState<ARNavigationState>({
    status: 'idle',
  });
  const [viewMode, setViewMode] = useState<'map' | 'ar'>('map');
  const { toast } = useToast();

  const handleStartNavigation = () => {
    if (!destination) {
      toast({
        title: "Destination Required",
        description: "Please enter a destination to start navigation.",
        variant: "destructive",
      });
      return;
    }
    setViewMode('ar');
    setNavigationState({
      status: 'navigating',
      destination: destination,
      accessibilityNeeds: accessibilityNeeds,
      currentInstruction: 'Proceed straight 100m',
      eta: '5 mins'
    });
  };

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
  
  const resetAndShowMap = () => {
    // setDestination(''); // Optional: clear destination upon exiting AR
    // setAccessibilityNeeds(''); // Optional: clear needs
    setViewMode('map');
    setNavigationState({ status: 'idle' }); // Reset AR state
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-center">Campus Navigation</h2>
      
      {viewMode === 'map' && (
        <>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapIcon size={24} /> Plan Your Route
              </CardTitle>
              <CardDescription>
                Enter your destination and any accessibility needs, then start AR navigation or explore the map.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Label htmlFor="destination" className="sr-only">Destination</Label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Search for room or location (e.g., Lecture Hall A101)"
                  className="pl-10"
                />
              </div>
              <div>
                <Label htmlFor="accessibilityNeeds">Accessibility Needs (Optional)</Label>
                <Input
                  id="accessibilityNeeds"
                  value={accessibilityNeeds}
                  onChange={(e) => setAccessibilityNeeds(e.target.value)}
                  placeholder="e.g., avoid stairs, prefer ramps"
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

          <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg border">
            <Image
              src="https://placehold.co/800x450.png"
              alt="Campus Map Placeholder"
              layout="fill"
              objectFit="cover"
              data-ai-hint="university campus map"
              priority
            />
            <Button
              onClick={handleStartNavigation}
              className="absolute bottom-4 right-4 btn-interactive shadow-md"
              size="lg"
              aria-label="Switch to AR Mode"
            >
              <CornerUpRight className="mr-2 h-5 w-5" /> AR Mode
            </Button>
          </div>
        </>
      )}

      {viewMode === 'ar' && (
        <>
          <ARViewMock navigationState={navigationState} />
          <div className="max-w-md mx-auto space-y-3 text-center">
            {navigationState.status === 'navigating' && (
                 <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button variant="outline" onClick={simulateObstacle} className="flex-grow">Simulate Obstacle</Button>
                    <Button variant="outline" onClick={simulateArrival} className="flex-grow">Simulate Arrival</Button>
                 </div>
            )}
            <Button onClick={resetAndShowMap} className="w-full" variant="secondary">
              {navigationState.status === 'arrived' ? 'Plan New Route' : 'Exit AR & View Map'}
            </Button>
          </div>
        </>
      )}

      <Card className="mt-8 max-w-2xl mx-auto shadow-lg">
        <CardHeader>
            <CardTitle>How to Use Campus Navigation</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>1. Enter your destination and any accessibility preferences in the form above the map.</p>
            <p>2. Tap "Start AR Navigation" or the "AR Mode" button on the map to enter augmented reality.</p>
            <p>3. Hold your phone up and follow the on-screen guidance projected onto your camera view.</p>
            <p>4. The app will alert you to obstacles and suggest alternative accessible routes if needed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
