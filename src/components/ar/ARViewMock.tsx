'use client';

import type { ARNavigationState } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Navigation, ArrowUp, MapPin } from 'lucide-react';
import Image from 'next/image';

interface ARViewMockProps {
  navigationState: ARNavigationState;
}

export default function ARViewMock({ navigationState }: ARViewMockProps) {
  const getGuidanceContent = () => {
    switch (navigationState.status) {
      case 'navigating':
        return (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/70 text-white p-4 rounded-lg shadow-xl text-center">
            <ArrowUp size={48} className="mx-auto mb-2" />
            <p className="text-lg font-semibold">{navigationState.currentInstruction || "Proceed straight 50m"}</p>
            {navigationState.eta && <p className="text-sm">ETA: {navigationState.eta}</p>}
          </div>
        );
      case 'obstacle_alert':
        return (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-11/12">
            <Card className="bg-destructive/90 text-destructive-foreground border-destructive shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={24} /> Obstacle Alert!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{navigationState.obstacleMessage || "Elevator ahead is out of service."}</p>
                <p className="mt-2 font-semibold">Finding an alternative route...</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'rerouting':
         return (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/70 text-white p-4 rounded-lg shadow-xl text-center">
            <Navigation size={48} className="mx-auto mb-2 animate-pulse" />
            <p className="text-lg font-semibold">Rerouting...</p>
            <p className="text-sm">{navigationState.currentInstruction || "Please wait."}</p>
          </div>
        );
      case 'arrived':
        return (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-11/12">
            <Card className="bg-primary/90 text-primary-foreground border-primary shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={24} /> You have arrived!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">Destination: {navigationState.destination}</p>
                <CheckCircle size={40} className="mx-auto mt-4 text-green-300" />
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full aspect-[9/16] max-w-md mx-auto bg-gray-700 rounded-lg overflow-hidden shadow-2xl border-4 border-gray-800">
      <Image
        src="https://placehold.co/360x640.png"
        alt="AR Camera View Mock"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
        data-ai-hint="university hallway"
      />
      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
        REC ●
      </div>
      {navigationState.destination && navigationState.status !== 'idle' && navigationState.status !== 'prompt_destination' && (
        <div className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-md shadow">
            <p className="text-xs font-medium">Destination:</p>
            <p className="text-sm font-semibold truncate max-w-[150px]">{navigationState.destination}</p>
        </div>
      )}
      {getGuidanceContent()}
    </div>
  );
}
