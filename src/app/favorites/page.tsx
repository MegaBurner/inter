'use client';

import { useState } from 'react';
import FavoriteCard from '@/components/favorites/FavoriteCard';
import { mockFavoriteLocations } from '@/constants/mockData';
import type { FavoriteLocation } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // For mock feedback

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>(mockFavoriteLocations);
  const { toast } = useToast();

  // Mock handlers
  const handleNavigate = (id: string) => {
    const loc = favorites.find(f => f.id === id);
    toast({ title: "Navigate (Mock)", description: `Starting navigation to ${loc?.name}.` });
  };

  const handleEdit = (id: string) => {
    const loc = favorites.find(f => f.id === id);
    toast({ title: "Edit Favorite (Mock)", description: `Opening edit for ${loc?.name}.` });
  };

  const handleDelete = (id: string) => {
    const loc = favorites.find(f => f.id === id);
    // setFavorites(prev => prev.filter(fav => fav.id !== id)); // Actual delete
    toast({
      title: "Delete Favorite (Mock)",
      description: `${loc?.name} would be removed. (UI Only)`,
      variant: "destructive"
    });
  };
  
  const handleAddFavorite = () => {
      toast({ title: "Add Favorite (Mock)", description: "Functionality to add a new favorite location." });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Favorite Locations</h2>
            <p className="text-muted-foreground mt-1">Your saved spots for quick access.</p>
        </div>
        <Button onClick={handleAddFavorite} className="btn-interactive">
          <PlusCircle size={18} className="mr-2" />
          Add New Favorite
        </Button>
      </header>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((location) => (
            <FavoriteCard 
                key={location.id} 
                location={location} 
                onNavigate={handleNavigate}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Star size={48} className="mx-auto text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-xl font-semibold">No Favorites Yet</h3>
          <p className="text-muted-foreground mt-2">Add your frequently visited locations for easy access.</p>
          <Button onClick={handleAddFavorite} className="mt-6 btn-interactive">
            <PlusCircle size={18} className="mr-2" />
            Add Your First Favorite
          </Button>
        </div>
      )}
    </div>
  );
}
