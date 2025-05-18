
'use client';

import { useState, useEffect, useRef } from 'react';
import type { ARNavigationState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ARViewMock from '@/components/ar/ARViewMock';
import { Wand2, Map as MapIcon, Search, CornerUpRight, Route, Edit, Navigation, Info } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { url } from 'inspector';
import campusMap from '@/assets/campus-map.png';

export default function CampusNavigationPage() {
  const [destination, setDestination] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [navigationState, setNavigationState] = useState<ARNavigationState>({
    status: 'idle',
  });
  const [viewMode, setViewMode] = useState<'map' | 'ar'>('map');
  const [isRoutePreview, setIsRoutePreview] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
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
        description: `Showing preview for: ${destination}. Tap the AR button on the map to start.`,
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

  // Effect to clear route preview if destination or needs change
  useEffect(() => {
    if (isRoutePreview) {
      // This effect could be more nuanced, e.g., only reset if actively previewing
      // and a relevant input changes. For now, any change to these inputs while previewing
      // will require re-clicking "Show Route Preview".
      const timeoutId = setTimeout(() => {
          // Check if user is still typing
          // This logic is a bit simplified. A real app might use debounce.
          if (destination !== navigationState.destination || accessibilityNeeds !== navigationState.accessibilityNeeds) {
            setIsRoutePreview(false);
          }
      }, 500); // A small delay
      return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, accessibilityNeeds]);


  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-center sr-only">Campus Navigation</h2>
      
      {viewMode === 'map' && (
        <div className="w-full aspect-[3/4] md:aspect-video mx-auto rounded-lg overflow-hidden shadow-xl border">
          {/* Top Input Bar */}
          <div className="absolute top-20 left-4 right-4 z-20 bg-background/90 backdrop-blur-sm rounded-lg shadow-xl p-3 sm:p-4 space-y-3">
            <div className="relative">
              <Label htmlFor="destination" className="sr-only">Destination</Label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search destination (e.g., Lecture Hall A101)"
                className="pl-9 h-10 text-sm sm:text-base"
                disabled={isRoutePreview && viewMode === 'map'}
              />
            </div>
            <div>
              <Label htmlFor="accessibilityNeeds" className="sr-only">Accessibility Needs</Label>
              <Input
                id="accessibilityNeeds"
                value={accessibilityNeeds}
                onChange={(e) => setAccessibilityNeeds(e.target.value)}
                placeholder="Accessibility needs (e.g., avoid stairs)"
                className="h-10 text-sm sm:text-base"
                disabled={isRoutePreview && viewMode === 'map'}
              />
            </div>
            {!isRoutePreview ? (
              <Button onClick={handleShowRoutePreview} className="w-full btn-interactive h-10 text-sm sm:text-base">
                <Route className="mr-2 h-4 w-4" /> Show Route Preview
              </Button>
            ) : (
              <Button onClick={() => setIsRoutePreview(false)} className="w-full h-10 text-sm sm:text-base" variant="outline">
                <Edit className="mr-2 h-4 w-4" /> Modify Details
              </Button>
            )}
          </div>

          {/* Map Image - fills the container */}
          <Image
            // Suggested code may be subject to a license. Learn more: ~LicenseLog:1735308077.
            src={campusMap}
            alt="Campus Map Placeholder"
            layout="fill"
            objectFit="cover"
            data-ai-hint="university campus map aerial"
            priority
            className="z-10"
          />

          {/* Route Preview Info - absolutely positioned */}
          {isRoutePreview && destination && (
            <div className="absolute top-[calc(4rem+4rem+3rem)] sm:top-[calc(4.5rem+4.5rem+3rem)] left-4 bg-black/75 text-white p-2 sm:p-3 rounded-md shadow-lg space-y-1 text-xs sm:text-sm max-w-[calc(100%-3rem)] z-20">
              <p className="font-semibold">Previewing Route:</p>
              <p><span className="font-medium">To:</span> {destination}</p>
              <p><span className="font-medium">Needs:</span> {accessibilityNeeds || 'None'}</p>
            </div>
          )}

          {/* Info Button FAB */}
          <Button
            onClick={() => setShowInfoDialog(true)}
            className="absolute bottom-20 left-6 z-20 rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 flex items-center justify-center shadow-xl bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Show How to Use"
          >
            <Info size={20} smSize={24} />
          </Button>


          {/* AR Mode FAB */}
          <Button
            onClick={handleStartAR}
            className="absolute bottom-20  right-6 z-20 rounded-full w-14 h-14 sm:w-16 sm:h-16 p-0 flex items-center justify-center shadow-xl btn-interactive"
            aria-label="Switch to AR Mode"
            disabled={!isRoutePreview || !destination} 
          >
            <CornerUpRight size={24} smSize={28} />
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

      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How to Use Campus Navigation</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-3 py-2">
            <p>1. Enter your destination and any accessibility preferences in the search bar at the top of the map.</p>
            <p>2. Click "Show Route Preview" to confirm. Route details will appear overlaid on the map.</p>
            <p>3. Tap the AR button (bottom-right on map) to start augmented reality navigation.</p>
            <p>4. Hold your phone up and follow guidance. The app alerts to obstacles and reroutes if needed.</p>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
