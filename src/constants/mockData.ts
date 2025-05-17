import type { StudySpace, FavoriteLocation } from '@/lib/types';
import { BookOpen, Building, Coffee } from 'lucide-react';

export const mockStudySpaces: StudySpace[] = [
  { id: 'lib-1', name: 'Main Library - Floor 1', location: 'Building A, Level 1', occupancy: 'medium', capacity: 150, features: ['Quiet Zone', 'PCs', 'Printers'] },
  { id: 'lounge-b', name: 'Student Lounge - Block B', location: 'Building B, Ground Floor', occupancy: 'high', capacity: 40, features: ['Group Work Tables', 'Vending Machines'] },
  { id: 'quiet-c2', name: 'Quiet Study - Building C', location: 'Building C, Level 2', occupancy: 'low', capacity: 20, features: ['Individual Desks', 'Power Outlets'] },
  { id: 'cafe-study', name: 'Campus Cafe Study Area', location: 'Building D, Near Cafe', occupancy: 'medium', capacity: 30, features: ['Background Noise', 'Coffee Access'] },
  { id: 'cs-lab', name: 'Computer Science Lab', location: 'Building E, Level 3', occupancy: 'low', capacity: 50, features: ['Specialized Software', 'PCs'] },
];

export const mockFavoriteLocations: FavoriteLocation[] = [
  { id: 'lh-a101', name: 'Lecture Hall A101', category: 'Lecture Hall', icon: Building },
  { id: 'study-quiet', name: 'Quiet Study Room C203', category: 'Study Room', icon: BookOpen },
  { id: 'prof-office', name: 'Prof. Schmidt Office', category: 'Office', icon: Coffee },
  { id: 'main-lib', name: 'Main Library Entrance', category: 'Library', icon: BookOpen },
];
