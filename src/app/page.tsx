
'use client';

import { useState } from 'react';
import type { ARNavigationState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ARViewMock from '@/components/ar/ARViewMock';
import { Wand2, Map as MapIcon, Search, CornerUpRight, Route, Edit } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function CampusNavigationPage() {
  const [destination, setDestination] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [navigationState, setNavigationState] = useState<ARNavigationState>({
    status: 'idle',
  });
  const [viewMode, setViewMode] = useState<'map' | 'ar'>('map');
  const [isRoutePreview, setIsRoutePreview] = useState(false);
  const { toast } = useToast();

  const handleShowRoutePreview = () => {
    if (!destination) {
      toast({
        title: "Destination Required",
        description: "Please enter a destination to preview the route.",
        variant: "destructive",
      });
      return;
    }
    setIsRoutePreview(true);
    toast({
        title: "Route Preview Ready",
        description: `Showing preview for: ${destination}. Click 'AR Mode' on the map to start.`,
      });
  };

  const handleStartAR = () => {
    if (!destination) {
      toast({
        title: "Destination Required",
        description: "Please enter a destination in the form above and preview the route first.",
        variant: "destructive",
      });
      return;
    }
     if (!isRoutePreview) {
      toast({
        title: "Preview Route First",
        description: "Please click 'Show Route Preview' before starting AR navigation.",
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
  
  const resetAndShowMap = () => {
    setViewMode('map');
    setNavigationState({ status: 'idle' });
    // isRoutePreview, destination, and accessibilityNeeds are preserved
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

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-center">Campus Navigation</h2>
      
      {viewMode === 'map' && (
        <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl border">
          {/* Input Card - absolutely positioned */}
          <Card className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md bg-background/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="pb-3 pt-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapIcon size={20} /> Plan Your Route
              </CardTitle>
              <CardDescription className="text-xs">
                Enter destination, preview, then tap AR Mode on map.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 py-3">
              <div className="relative">
                <Label htmlFor="destination" className="sr-only">Destination</Label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => { 
                    setDestination(e.target.value); 
                    if (isRoutePreview) setIsRoutePreview(false); 
                  }}
                  placeholder="Search (e.g., Lecture Hall A101)"
                  className="pl-9 h-9 text-sm"
                  disabled={isRoutePreview && viewMode === 'map'}
                />
              </div>
              <div>
                <Label htmlFor="accessibilityNeeds" className="sr-only">Accessibility Needs</Label>
                <Input
                  id="accessibilityNeeds"
                  value={accessibilityNeeds}
                  onChange={(e) => { 
                    setAccessibilityNeeds(e.target.value); 
                    if (isRoutePreview) setIsRoutePreview(false); 
                  }}
                  placeholder="Accessibility needs (e.g., avoid stairs)"
                  className="mt-1 h-9 text-sm"
                  disabled={isRoutePreview && viewMode === 'map'}
                />
              </div>
            </CardContent>
            <CardFooter className="pt-3 pb-4">
              {!isRoutePreview ? (
                <Button onClick={handleShowRoutePreview} className="w-full btn-interactive h-9 text-sm">
                  <Route className="mr-2 h-4 w-4" /> Show Route Preview
                </Button>
              ) : (
                <Button onClick={() => setIsRoutePreview(false)} className="w-full h-9 text-sm" variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Modify Details
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Map Image - fills the container */}
          <Image
            src="https://placehold.co/1200x675.png"
            alt="Campus Map Placeholder"
            layout="fill"
            objectFit="cover"
            data-ai-hint="university campus map aerial"
            priority
          />

          {/* Route Preview Info - absolutely positioned */}
          {isRoutePreview && destination && (
            <div className="absolute top-4 left-4 bg-black/75 text-white p-3 rounded-md shadow-lg space-y-1 text-sm max-w-[calc(100%-3rem)] z-10">
              <p className="font-semibold">Previewing Route:</p>
              <p><span className="font-medium">To:</span> {destination}</p>
              <p><span className="font-medium">Needs:</span> {accessibilityNeeds || 'None'}</p>
            </div>
          )}

          {/* AR Mode Button - absolutely positioned */}
          <Button
            onClick={handleStartAR}
            className="absolute bottom-6 right-6 btn-interactive shadow-xl"
            size="lg"
            aria-label="Switch to AR Mode"
            disabled={!isRoutePreview} 
          >
            <CornerUpRight className="mr-2 h-5 w-5" /> AR Mode
          </Button>
        </div>
      )}

      {viewMode === 'ar' && (
        <>
          <ARViewMock navigationState={navigationState} />
          <div className="max-w-md mx-auto space-y-3 text-center mt-4">
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
            <p>1. Enter your destination and any accessibility preferences in the form overlaid on the map.</p>
            <p>2. Click "Show Route Preview" to confirm your details. The route info will appear on the map.</p>
            <p>3. Tap the "AR Mode" button (bottom-right on the map) to enter augmented reality navigation.</p>
            <p>4. Hold your phone up and follow the on-screen guidance.</p>
            <p>5. The app will alert you to obstacles and suggest alternative routes if needed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
