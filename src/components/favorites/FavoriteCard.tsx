import type { FavoriteLocation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Navigation, Trash2, Edit3, MapPin } from 'lucide-react';

interface FavoriteCardProps {
  location: FavoriteLocation;
  onNavigate?: (id: string) => void; // Mock callbacks
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function FavoriteCard({ location, onNavigate, onEdit, onDelete }: FavoriteCardProps) {
  const IconComponent = location.icon || MapPin;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
                <IconComponent size={22} className="text-primary" />
                {location.name}
            </CardTitle>
            <Star size={20} className="text-yellow-400 fill-yellow-400" />
        </div>
        <CardDescription>{location.category}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Placeholder for additional details if any */}
        <p className="text-sm text-muted-foreground">Quick access to your saved location.</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => onNavigate?.(location.id)} className="w-full sm:w-auto flex-grow btn-interactive">
          <Navigation size={16} className="mr-2" />
          Navigate (Mock)
        </Button>
        <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="icon" onClick={() => onEdit?.(location.id)} aria-label="Edit Favorite">
                <Edit3 size={16} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onDelete?.(location.id)} aria-label="Delete Favorite" className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/50 hover:border-destructive">
                <Trash2 size={16} />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
