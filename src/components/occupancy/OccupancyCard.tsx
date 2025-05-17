import type { StudySpace } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OccupancyStatusBadge from './OccupancyStatusBadge';
import { MapPin, Users, Compass } from 'lucide-react';

interface OccupancyCardProps {
  space: StudySpace;
}

export default function OccupancyCard({ space }: OccupancyCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">{space.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 pt-1">
            <MapPin size={14} className="text-muted-foreground" /> {space.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Current Occupancy:</span>
          <OccupancyStatusBadge level={space.occupancy} />
        </div>
        {space.capacity && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={16} /> Capacity: {space.capacity}
          </div>
        )}
        {space.features && space.features.length > 0 && (
            <div>
                <h4 className="text-sm font-semibold mb-1">Features:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                    {space.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
            <Compass size={16} className="mr-2" />
            Navigate to Space (Mock)
        </Button>
      </CardFooter>
    </Card>
  );
}
