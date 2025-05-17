import OccupancyCard from '@/components/occupancy/OccupancyCard';
import { mockStudySpaces } from '@/constants/mockData';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function OccupancyPage() {
  // In a real app, you'd fetch this data and implement search/filter
  const spaces = mockStudySpaces;

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Study Space Occupancy</h2>
        <p className="text-muted-foreground mt-2">Find available study spots across campus.</p>
      </header>

      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
            type="search" 
            placeholder="Search for study spaces (e.g., Library, Block B...)" 
            className="pl-10"
        />
      </div>

      {spaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <OccupancyCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No study spaces found.</p>
      )}
    </div>
  );
}
